import { response } from 'express';
import baseService from './base.service';
import { sequelize } from '../utils/database';

const uploadPhoto = require('../utils/aws/s3');
import * as manageUniqeId from '../utils/manageUniqeIds/manageUniqueId';

export class detailProfileService extends baseService {
  async sync(req) {
    let response;

    let mainProfileID = req.body.mainProfileId;

    if (req.body.actionType === 'add') {
      // console.log('added');

      let uniqueid = await manageUniqeId.generateUniqueId(mainProfileID);

      // console.log(req.body.portfoliosIds)
      response = await this._detailProfileModel.create({
        unique_id: uniqueid,
        private_title: req.body.privateTitle,
        main_profile_id: mainProfileID, // req.body.mainProfileId,
        video_attached: req.body.video_attached,
        designation: req.body.designation,
        tag_line: req.body.tagLine,
        skills: req.body.skills,
        short_description: req.body.shortDescription,
        experiences_ids: JSON.parse(req.body.experiencesIds),
        portfolios_ids: JSON.parse(req.body.portfoliosIds),
        education_ids: JSON.parse(req.body.educationIds),
        skills_ids: JSON.parse(req.body.skillsIds),

        pdf_download_links: req.body.pdf_download_links,
        is_pdf_generated: req.body.is_pdf_generated,
        description: req.body.description,
        category1_title: req.body.category1Title,
        category1_description: req.body.category1Description,
        category2_title: req.body.category2Title,
        category2_description: req.body.category2Description,
        category2_status: req.body.category2Status,
        category3_title: req.body.category3Title,
        category3_description: req.body.category3Description,
        category3_status: req.body.category3Status,
        is_dynamic: false,
        content_nature: req.body.contentNature,
        companytype: req.body.companytype,
      });

      await manageUniqeId.saveExistingIds('add', mainProfileID, uniqueid);
      return await this.list(
        req.body.mainProfileId,
        req.body.contentNature,
        req.body.companytype
      );
    } else if (req.body.actionType === 'update') {
      const [rowsUpdated, updatedUser] = await this._detailProfileModel.update(
        {
          private_title: req.body.privateTitle,
          // main_profile_id: req.body.mainProfileId,
          designation: req.body.designation,
          tag_line: req.body.tagLine,
          skills: req.body.skills,
          video_attached: req.body.video_attached,
          short_description: req.body.shortDescription,
          experiences_ids: JSON.parse(req.body.experiencesIds),
          portfolios_ids: JSON.parse(req.body.portfoliosIds),
          education_ids: JSON.parse(req.body.educationIds),
          skills_ids: JSON.parse(req.body.skillsIds),
          pdf_download_links: req.body.pdf_download_links,
          is_pdf_generated: req.body.is_pdf_generated,
          services: req.body.services,
          description: req.body.description,
          category1_title: req.body.category1Title,
          category1_description: req.body.category1Description,
          category2_title: req.body.category2_title,
          category2_description: req.body.category2Description,
          category2_status: req.body.category2Status,
          category3_title: req.body.category3Title,
          category3_description: req.body.category3Description,
          category3_status: req.body.category3Status,
          content_nature: req.body.contentNature,
          companytype: req.body.companytype,
        },
        {
          where: { id: req.body.id },
          returning: true,
        }
      );
      // console.log(rowsUpdated, updatedUser);

      response = updatedUser;
      return await this.list(
        req.body.mainProfileId,
        req.body.contentNature,
        req.body.companytype
      );
    } else if (req.body.actionType === 'delete') {
      const [rowsUpdated, updatedUser] = await this._detailProfileModel.update(
        { is_deleted: true }, // Set is_deleted to true
        {
          where: { id: req.body.id },
          returning: true,
        }
      );

      response = updatedUser;
    }
    return response;
  }

  async list(mainProfileId, contentNature, companytype) {
    const query = `
    SELECT
        id,
        private_title,
        main_profile_id,
        unique_id,
        designation,
        tag_line,
        skills,
        "video_attached",
        short_description,
        companytype,
        description,
        category1_title,
        category1_description,
        category2_title,
        category2_description,
        category2_status,
        category3_title,
        "services",
        "is_pdf_generated",
        "pdf_download_links",
        category3_description,
        category3_status,
        "content_nature",
        duplicate,
        (
            SELECT
                json_agg(
                    json_build_object('id', _portfolios.id, 'title', _portfolios.title, 'start_date', _portfolios.starting_date, 'main_profile_id', _portfolios.main_profile_id ,'end_date', _portfolios."ending_Date", 'catagory', _portfolios.catagory, 'content_nature', _portfolios."content_nature", 'companytype', _portfolios.companytype, 'has_testimonial', _portfolios.has_testimonial)
                ) AS skills_ids
            FROM
                "Detail_Profiles" _detailProfile_child,
                json_array_elements_text(_detailProfile_child.portfolios_ids -> 'portfolio_ids') AS fk
                JOIN "Portfolios" _portfolios ON _portfolios.id = fk :: UUID
            WHERE
                _detailProfile_parent.id = _detailProfile_child.id
        ) AS portfolios_ids,
        (
            SELECT
                json_agg(
                    json_build_object('id', _education.id, 'degree_name', _education.degree_name)
                ) AS skills_ids
            FROM
                "Detail_Profiles" _detailProfile_child,
                json_array_elements_text(education_ids -> 'education_ids') AS fk
                JOIN "Education" _education ON _education.id = fk :: UUID
            WHERE
                _detailProfile_parent.id = _detailProfile_child.id
        ) AS education_ids,
          (
      select
        json_agg(
          json_build_object('id', _skills.id, 'title', _skills.title, 'url', _skills.url, 'order', _skills.order)
        ) as skills_ids
      from
        "Detail_Profiles" _detailProfile_child,
        json_array_elements_text(skills_ids -> 'skills_ids') as fk
        join "Skills" _skills on _skills.id = fk :: uuid
      where
        _detailProfile_parent.id = _detailProfile_child.id
    ) AS skill_ids,
        (
            SELECT
                json_agg(
                    json_build_object('id', _experiences.id, 'title', _experiences.title, 'start_date', _experiences.starting_date, 'end_date', _experiences."ending_Date", 'main_profile_id', _experiences.main_profile_id ,'catagory', _experiences.catagory, 'content_nature', _experiences."content_nature")
                ) AS skills_ids
            FROM
                "Detail_Profiles" _detailProfile_child,
                json_array_elements_text(_detailProfile_child.experiences_ids -> 'experiences_ids') AS fk
                JOIN "Experiences" _experiences ON _experiences.id = fk :: UUID
            WHERE
                _detailProfile_parent.id = _detailProfile_child.id
        ) AS experiences_ids
    FROM
        "Detail_Profiles" _detailProfile_parent
    WHERE
        _detailProfile_parent.is_deleted = false 
        AND _detailProfile_parent.main_profile_id = '${mainProfileId}'
        AND _detailProfile_parent.content_nature = '${contentNature}'
        AND _detailProfile_parent.companytype = '${companytype}'`;

    const results = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    return results;
  }

  async duplicateDetailProfile(originalDetailProfileId, mainProfile) {
    const originalDetailProfile = await this._detailProfileModel.findOne({
      where: { id: originalDetailProfileId },
    });

    if (!originalDetailProfile) {
      throw new Error('Detail profile not found.');
    }

    try {
      let uniqueid = await manageUniqeId.generateUniqueId(mainProfile);
      const duplicatedDetailProfile = {
        unique_id: uniqueid,
        private_title: originalDetailProfile.private_title,
        main_profile_id: mainProfile,
        designation: originalDetailProfile.designation,
        tag_line: originalDetailProfile.tag_line,
        skills: originalDetailProfile.skills,
        short_description: originalDetailProfile.short_description,
        experiences_ids: originalDetailProfile.experiences_ids,
        portfolios_ids: originalDetailProfile.portfolios_ids,
        education_ids: originalDetailProfile.education_ids,
        skills_ids: originalDetailProfile.skills_ids,
        description: originalDetailProfile.description,
        category1_title: originalDetailProfile.category1_title,
        category1_description: originalDetailProfile.category1_description,
        category2_title: originalDetailProfile.category2_title,
        category2_description: originalDetailProfile.category2_description,
        category2_status: originalDetailProfile.category2_status,
        category3_title: originalDetailProfile.category3_title,
        category3_description: originalDetailProfile.category3_description,
        category3_status: originalDetailProfile.category3_status,
        video_attached: originalDetailProfile.video_attached,
        content_nature: originalDetailProfile.content_nature,
        companytype: originalDetailProfile.companytype,
        services: originalDetailProfile.services,
        is_pdf_generated: originalDetailProfile.is_pdf_generated,
        pdf_download_links: originalDetailProfile.pdf_download_links,
        duplicate: 'Yes',
      };
      await manageUniqeId.saveExistingIds('add', mainProfile, uniqueid);
      await this._detailProfileModel.create(duplicatedDetailProfile);
      // console.log('duplicatedDetailProfile', duplicatedDetailProfile);

      return duplicatedDetailProfile;
    } catch (error) {
      // console.log('error', error);
    }
  }

  async uploadCv(req) {
    try {
      const id = req.body.id;
      const cvFile = req.files?.cvFile;

      const detailProfile = await this._detailProfileModel.findOne({
        where: { id },
      });

      if (!detailProfile) {
        return {
          success: false,
          message: 'Detail profile not found.',
        };
      }
      const uploadedCvFile = await uploadPhoto.uploadRequest(cvFile);

      let pdfDownloadLinks = detailProfile.pdf_download_links || [];

      if (!Array.isArray(pdfDownloadLinks)) {
        pdfDownloadLinks = [];
      }

      pdfDownloadLinks.push({
        type: 'CV',
        cvFileUrl: uploadedCvFile,
      });

      detailProfile.pdf_download_links = pdfDownloadLinks;

      if (!detailProfile.is_pdf_generated) {
        detailProfile.is_pdf_generated = true;
      }

      await detailProfile.save();

      return detailProfile;
    } catch (error) {
      console.log(error);
    }
  }
}
