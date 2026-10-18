import { response } from 'express';
import baseService from './base.service';
import { sequelize } from '../utils/database';
import { checkRecord } from '../utils/checkRecord';
import { createTransport } from 'nodemailer';
import { google } from 'googleapis';
import fs from 'fs';
import { deletePhotoWhileUpdate } from '../utils/deletePhotoWhileUpdate';
import { Env } from '../config';

const uploadPhoto = require('../utils/aws/s3');

export class portfolioService extends baseService {
  async sendEmail(req) {
    const file = req.files.attachment;

    const attachments = [];

    if (Array.isArray(file))
      file.forEach((element) => {
        attachments.push({
          filename: element.name, // Use the original filename from Multer
          content: element.data, // Stream the file content directly
          contentType: element.mimetype, // Use the automatically detected mimetype
        });
      });
    else
      attachments.push({
        filename: file.name, // Use the original filename from Multer
        content: file.data, // Stream the file content directly
        contentType: file.mimetype, // Use the automatically detected mimetype
      });

    // console.log(attachments);

    // Gmail OAuth2 credentials come from the environment (see .env.example).
    const client_id = Env.googleClientId;
    const client_Secret = Env.googleClientSecret;
    const referesh_token = Env.googleRefreshToken;
    const user = Env.mailSender;

    if (!client_id || !client_Secret || !referesh_token || !user) {
      throw new Error('Email is not configured: set the GOOGLE_* and MAIL_SENDER variables');
    }

    const redirect_url = 'https://developers.google.com/oauthplayground';

    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_Secret,
      redirect_url
    );

    oAuth2Client.setCredentials({ refresh_token: referesh_token });

    const accessToken = await oAuth2Client.getAccessToken();
    // const { tokens } = await oAuth2Client.refreshAccessToken();
    // const accessToken = tokens.access_token;

    const transporter = createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: user,
        clientId: client_id,
        clientSecret: client_Secret,
        refreshToken: referesh_token,
        accessToken: accessToken,
      },
    });

    const emailOptions = {
      from: user,
      to: req.body.to,
      subject: req.body.subject,
      text: req.body.body,
      html: req.body.body,
      attachments: attachments,

      // attachments: [{
      //   filename: file[0].originalname, // Use the original filename from Multer
      //   content: file[0].data, // Stream the file content directly
      //   contentType: file[0].mimetype  // Use the automatically detected mimetype
      // }, {
      //   filename: file[1].originalname, // Use the original filename from Multer
      //   content: file[1].data, // Stream the file content directly
      //   contentType: file[1].mimetype  // Use the automatically detected mimetype
      // }]
    };
    // console.log(emailOptions);

    await transporter.sendMail(emailOptions);
  }

  async sync(req) {
    let response;
    let pictures = '';
    let thumbnail = '';
    let company_icon = '';
    let child_hero_banner = '';

    if (req.body.actionType === 'add') {
      pictures = await uploadPhoto.uploadRequestMultiple(req.files.pictures);
      thumbnail = await uploadPhoto.uploadRequest(req.files.thumbnail);
      {
        req.files &&
          req.files.company_icon &&
          req.files.company_icon !== 'null' &&
          (company_icon = await uploadPhoto.uploadRequest(
            req.files.company_icon
          ));
      }
      {
        req.files &&
          req.files.child_hero_banner &&
          req.files.child_hero_banner !== 'null' &&
          (child_hero_banner = await uploadPhoto.uploadRequest(
            req.files.child_hero_banner
          ));
      }
    }

    if (req.body.actionType === 'add') {
      response = await this._portfolioModel.create({
        title: req.body.title,
        private_title: req.body.privateTitle,
        main_profile_id: req.body.mainProfileId,
        tagline_1: req.body.tagline1,
        tagline_2: req.body.tagline2,
        features_short: req.body.featuresShort,
        tech_short: req.body.techShort,
        skills_ids_shorts: JSON.parse(req.body.skillsIdsShorts),
        categorys: JSON.parse(req.body.categorys),
        features_long: req.body.featuresLong,
        tech_long: req.body.techLong,
        skills_ids_long: { skills_ids: 'N/A' },
        link: req.body.link,
        thumbnail: thumbnail,
        company_icon: company_icon,
        child_hero_banner: child_hero_banner,
        pictures: JSON.stringify(pictures),
        starting_date: req.body.startingDate,
        display_order: req.body.display_order,
        ending_Date: req.body.endingDate,
        catagory: req.body.catagory,
        duplicate: 'No',
        content_nature: req.body.contentNature,
        my_role: req.body.my_role,
        services_i_provide: req.body.services_i_provide,
        client_name: req.body.client_name,
        companytype: req.body.companytype,
        has_testimonial: req.body.has_testimonial,
        is_for_cypexsoft: req.body.is_for_cypexsoft,
        cypexsoft_category: req.body.cypexsoft_category,
      });
    } else if (req.body.actionType === 'update') {
      const existingPortfolio = await this._portfolioModel.findOne({
        where: { id: req.body.id },
      });

      if (!existingPortfolio) {
        throw new Error('Portfolio not found');
      }
      let bodyPayload = {
        title: req.body.title,
        private_title: req.body.privateTitle,
        main_profile_id: req.body.mainProfileId,
        tagline_1: req.body.tagline1,
        tagline_2: req.body.tagline2,
        features_short: req.body.featuresShort,
        tech_short: req.body.techShort,
        skills_ids_shorts: JSON.parse(req.body.skillsIdsShorts),
        categorys: JSON.parse(req.body.categorys),
        display_order: req.body.display_order,
        features_long: req.body.featuresLong,
        my_role: req.body.my_role,
        services_i_provide: req.body.services_i_provide,
        client_name: req.body.client_name,
        tech_long: req.body.techLong,
        skills_ids_long: { skills_ids: 'N/A' }, //JSON.parse(req.body.skillsIdsLong),
        link: req.body.link,
        // thumbnail: thumbnail,
        // pictures: JSON.stringify(pictures),
        starting_date: req.body.startingDate,
        ending_Date: req.body.endingDate,
        catagory: req.body.catagory,
        content_nature: req.body.contentNature,
        companytype: req.body.companytype,
        has_testimonial: req.body.has_testimonial,
        is_for_cypexsoft: req.body.is_for_cypexsoft,
        cypexsoft_category: req.body.cypexsoft_category,
      };

      /* if (!req.body.thumbnail) {
         thumbnail = await deletePhotoWhileUpdate({
           fileData: req.files,
           fileInFileData: req.files.thumbnail,
           existingFile: existingPortfolio.thumbnail,
         });
         bodyPayload.thumbnail = thumbnail;
       }
       if (!req.body.company_icon) {
         company_icon = await deletePhotoWhileUpdate({
           fileData: req.files,
           fileInFileData: req.files.company_icon,
           existingFile: existingPortfolio.company_icon,
         });
         bodyPayload.company_icon = company_icon;
       }
       if (!req.body.child_hero_banner) {
         child_hero_banner = await deletePhotoWhileUpdate({
           fileData: req.files,
           fileInFileData: req.files.child_hero_banner,
           existingFile: existingPortfolio.child_hero_banner,
         });
         bodyPayload.child_hero_banner = child_hero_banner;
       }
 
       */

      if (req.files && req?.files?.pictures) {
        if (existingPortfolio.pictures) {
          const oldPictures = JSON.parse(existingPortfolio.pictures);
          oldPictures.forEach(async (pictureUrl) => {
            const oldPictureKey = pictureUrl?.split('/').pop();
            await uploadPhoto.deletephoto(oldPictureKey);
          });
        }

        pictures = await uploadPhoto.uploadRequestMultiple(
          req?.files?.pictures
        );
        bodyPayload.pictures = JSON.stringify(pictures);
      } else {
        bodyPayload.pictures = existingPortfolio.pictures;
      }

      const [rowsUpdated, updatedUser] = await this._portfolioModel.update(
        bodyPayload,
        {
          where: { id: req.body.id },
          returning: true,
        }
      );

      response = updatedUser;
    } else if (req.body.actionType === 'delete') {
      const portfolioIdToDelete = req.body.id;
      const detailPortfolioPresent = await checkRecord(
        this._detailProfileModel,
        portfolioIdToDelete,
        'portfolios_ids'
      );

      if (detailPortfolioPresent) {
        throw new Error(
          'Cannot delete the portfolio as it is present in detail profile.'
        );
      }

      const [rowsUpdated, updatedUser] = await this._portfolioModel.update(
        { is_deleted: true },
        {
          where: { id: portfolioIdToDelete },
          returning: true,
        }
      );
      // console.log(rowsUpdated, updatedUser);
      response = updatedUser;
    } else if (req.body.actionType === 'delete') {
      let adsf = await this._portfolioModel.destroy({
        where: { id: req.body.id },
        returning: true,
      });
      response = adsf;
    }

    return response;
  }

  async list(
    contentNature,
    mainProfileId,
    sharedcategorys,
    has_testimonial,
    companytype,
    id // New parameter for id
  ) {
    // console.log('has_testimonial', has_testimonial);
    const categoryId =
      sharedcategorys === 'All'
        ? ''
        : JSON.parse(sharedcategorys).category_ids[0];

    let whereClause = '';


    // If id is provided, use it as the only filter
    if (id) {
      whereClause = `WHERE id = '${id}'`;
    } else {
      // Construct the where clause for other parameters if id is not provided
      whereClause = `
        WHERE
          is_deleted = false
          AND content_nature = '${contentNature}'
          AND main_profile_id = '${mainProfileId}'
          ${sharedcategorys === 'All'
          ? ''
          : `AND '${categoryId}' IN (SELECT json_array_elements_text(categorys -> 'category_ids')::uuid)`
        }
          ${has_testimonial === 'All'
          ? ''
          : `AND has_testimonial = '${has_testimonial}'`
        }
          
      `;
    }

    const query = `
      SELECT
        id,
        title,
        private_title,
        main_profile_id,
        tagline_1,
        tagline_2,
        features_short,
        tech_short,
        features_long,
        tech_long,
        catagory,
        "display_order",
        link,
        thumbnail,
        "company_icon",
        companytype,
        pictures,
        "starting_date",
        "updatedAt",
        "ending_Date",
        "content_nature",
        "has_testimonial",
        "is_for_cypexsoft",
        "my_role",
        "services_i_provide",
        "client_name",
        "child_hero_banner",
        "cypexsoft_category",
        "duplicate",
        (
          SELECT
            json_agg(
              json_build_object('id', _skills.id, 'title', _skills.title, 'url', _skills.url, 'order', _skills.order)
            ) as skills_ids
          FROM
            "Portfolios" _portfolios_child,
            json_array_elements_text(skills_ids_shorts -> 'skills_ids') as fk
            JOIN "Skills" _skills on _skills.id = fk :: uuid
          WHERE
            _portfolios_parent.id = _portfolios_child.id
        ) AS skills_ids_shorts,
        (
          SELECT
            json_agg(
              json_build_object('id', _c.id, 'title', _c.title, 'label', _c.label)
            ) as category_ids
          FROM
            "Portfolios" _portfolios_child,
            json_array_elements_text(categorys -> 'category_ids') as fk
            JOIN "Categories" _c on _c.id = fk :: uuid
          WHERE
            _portfolios_parent.id = _portfolios_child.id
        ) AS categorys
      FROM
        "Portfolios" _portfolios_parent
      ${whereClause};
    `;

    const results = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    return results;
  }

  async duplicatePortfolio(originalPortfolioId) {
    const originalPortfolio = await this._portfolioModel.findOne({
      where: { id: originalPortfolioId },
    });

    if (!originalPortfolio) {
      throw new Error('Portfolio not found');
    }

    const duplicatedPortfolio = {
      title: originalPortfolio.title,
      private_title: originalPortfolio.private_title,
      main_profile_id: originalPortfolio.main_profile_id,
      tagline_1: originalPortfolio.tagline_1,
      tagline_2: originalPortfolio.tagline_2,
      features_short: originalPortfolio.features_short,
      tech_short: originalPortfolio.tech_short,
      skills_ids_shorts: originalPortfolio.skills_ids_shorts,
      categorys: originalPortfolio.categorys,
      features_long: originalPortfolio.features_long,
      tech_long: originalPortfolio.tech_long,
      link: originalPortfolio.link,
      thumbnail: originalPortfolio.thumbnail,
      my_role: originalPortfolio.my_role,
      services_i_provide: originalPortfolio.services_i_provide,
      client_name: originalPortfolio.client_name,
      child_hero_banner: originalPortfolio.child_hero_banner,
      pictures: originalPortfolio.pictures,
      company_icon: originalPortfolio.company_icon,
      starting_date: originalPortfolio.starting_date,
      ending_Date: originalPortfolio.ending_Date,
      catagory: originalPortfolio.catagory,
      duplicate: 'Yes',
      content_nature: originalPortfolio.content_nature,
      companytype: originalPortfolio.companytype,
      has_testimonial: originalPortfolio.has_testimonial,
      display_order: originalPortfolio.display_order,
      is_for_cypexsoft: originalPortfolio.is_for_cypexsoft,
      cypexsoft_category: originalPortfolio.cypexsoft_category,
    };

    await this._portfolioModel.create(duplicatedPortfolio);

    return duplicatedPortfolio;
  }

  async listforTestimonials(req) {
    const list = await this._portfolioModel.findAll({
      where: {
        is_deleted: false,
        has_testimonial: true,
      },
    });
    return list;
  }

  async isForCypexsoft(req, isDetail = false) {
    const portfolioId = isDetail ? req.params.portfolio_id : null;
    const category = isDetail ? null : req.body.category;

    const query = `SELECT    
    p.id,
    p.title,
    p.private_title,
    p.main_profile_id,
    p.tagline_1,
    p.tagline_2,
    p.features_short,
    p.tech_short,
    p.features_long,
    p.tech_long,
    p.catagory,
    p.display_order,
    p.link,
    p.thumbnail,
    p.company_icon,
    p.companytype,
    p.pictures,
    p.my_role,
    p.services_i_provide,
    p.client_name,
    p.child_hero_banner,
    p.starting_date,
    p."ending_Date",
    p.content_nature,
    p.has_testimonial,
    p.is_for_cypexsoft,
    p.cypexsoft_category,
    p.duplicate,
    p.is_deleted,
    p."createdAt",
    p."updatedAt",
    (
        SELECT
            json_agg(
                json_build_object('id', _skills.id, 'title', _skills.title, 'url', _skills.url, 'order', _skills.order)
            ) AS skills_ids
        FROM
            json_array_elements_text(p.skills_ids_shorts -> 'skills_ids') AS fk
        JOIN 
            "Skills" _skills ON _skills.id = fk::uuid
    ) AS skills_ids_shorts,

    (
        SELECT
            json_agg(
                json_build_object('id', _c.id, 'title', _c.title, 'label', _c.label)
            ) as category_ids
        FROM
            json_array_elements_text(p.categorys -> 'category_ids') as fk
        JOIN 
            "Categories" _c ON _c.id = fk::uuid
    ) AS categorys

    /* Commented out the testimonials section
    ,
    CASE
        WHEN COUNT(t.id) > 0 THEN
            json_agg(
                json_build_object(
                    'testimonial_id', t.id,
                    'testimonial_main_profile_id', t.main_profile_id,
                    'client_pic', t.client_pic,
                    'client_name', t.client_name,
                    'client_designation', t.client_designation,
                    'client_company', t.client_company,
                    'client_company_website', t.client_company_website,
                    'testimonial_portfolio_id', t.portfolio_id,
                    'testimonial_is_deleted', t.is_deleted,
                    'testimonial_video', t.video,
                    'testimonial_createdAt', t."createdAt",
                    'testimonial_updatedAt', t."updatedAt",
                    'testimonial_display_order', t.display_order,
                    'review_text', t.review_text
                )
            )
        ELSE
            NULL
    END AS testimonials
    */

FROM
    "Portfolios" p
/* Commented out the join on Testimonials
LEFT JOIN
    "Testimonials" t ON p.id = t.portfolio_id
*/
WHERE
    p.is_deleted = false
    AND p.is_for_cypexsoft = true
    ${category ? `AND p.cypexsoft_category = '${category}'` : ''}
    ${portfolioId ? `AND p.id = :portfolioId` : ``}
GROUP BY
    p.id, p.title, p.is_for_cypexsoft
ORDER BY 
    p.display_order ASC;

    `;

    const replacements = isDetail ? { portfolioId } : null;

    const results = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
      replacements,
    });

    return results;
  }

  async updateOrderToDisplay(req, res) {
    try {
      const { id, display_order } = req.body;

      // Validate the input
      if (!id || display_order === undefined) {
        return 'ID and display_order are required';
      }

      const [updatedRows, [updatedData]] = await this._portfolioModel.update(
        { display_order },
        { returning: true, where: { id } }
      );

      if (updatedRows === 0) {
        return 'Record not found';
      }

      return updatedData;
    } catch (error) {
      console.error(error);
      return 'Internal Server Error';
    }
  }

  async newPortfoliolist() {
    const results = await this._portfolioModel.findAll({
      where: { is_deleted: false },
    });

    return results;
  }

  async getPortfoliosByDetailProfileId(req, res) {
    try {
      let query = `Select p."id", p.title, p.tagline_1, p.tagline_2,
                      p.features_short, p.tech_short, p.features_long,
                      p.tech_long, p.link, p.thumbnail, p.child_hero_banner,
                      p.has_testimonial, p.company_icon, p."pictures",
                      p.starting_date, p."ending_Date", p."duplicate",  (
                        SELECT 
                            json_agg(
                                json_build_object(
                                    'id', s.id,
                                    'title', s.title,
                                    'url', s.url,
                                    'order', s.order
                                )
                            ) AS skills_ids
                        FROM 
                            json_array_elements_text(p.skills_ids_shorts -> 'skills_ids') AS fk
                        JOIN 
                            "Skills" s ON s.id = fk::uuid
                    ) AS skills
              from
                  "Detail_Profiles" d,
                  json_array_elements_text(portfolios_ids -> 'portfolio_ids') as fk
                  join "Portfolios" p on p.id = fk :: uuid
              where d.id = '${req.body.detailProfileId}' 
                  order by p."createdAt" DESC
                  limit 10 offset ${req.body.offSet}`;

      const results = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
      });

      return results;
    }
    catch (err) {
      throw new Error(err);
    }
  }
}
