import { response } from 'express';
import baseService from './base.service';
import { sequelize } from '../utils/database';
import * as manageUniqeId from '../utils/manageUniqeIds/manageUniqueId';
import { tiny_urls } from '../models/tiny_url';
import { where } from 'sequelize';

export class tiny_url extends baseService {
  async list(req) {


    const query = `select 

public.tiny_urls.target_link,
public.tiny_urls.type,
'gourls.link/' || public.tiny_urls.uniqe_id short_url ,
"Portfolios".title as portfolio_title ,
public.tiny_urls.is_u
from tiny_urls left join "Portfolios" on "Portfolios".id = tiny_urls.portfolio_id
 where detail_profile_id = '${req.body.detail_profile_id}'
 `

    //     const query = `select 
    // public."Main_Profiles".id main_profile_id,
    // public."Main_Profiles".name,
    // public."Main_Profiles".profile_photo_1,
    // public."Detail_Profiles".id detail_profile_id,
    // public."Detail_Profiles".designation,
    // public.tiny_urls.target_link,
    // public.tiny_urls.type,
    // 'gourls.link/' || public.tiny_urls.uniqe_id short_url ,
    // public.tiny_urls.is_u,
    // public."Portfolios".title portfolio_title,
    // public."Portfolios".thumbnail portfolio_thumbnail



    // from 
    // public.tiny_urls 
    // join 
    // public."Main_Profiles" 
    // on public.tiny_urls.main_profile_id = public."Main_Profiles".id
    // join 
    // public."Detail_Profiles" 
    // on public.tiny_urls.detail_profile_id = public."Detail_Profiles".id
    // left join 
    // public."Portfolios" 
    // on public.tiny_urls.portfolio_id = public."Portfolios".id

    //  `

    const results = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    // const mergedData = results.reduce((acc, curr) => {
    //   const existing = acc.find(item => item.type === curr.type);
    //   if (existing) {
    //     if (curr.is_u) {
    //       existing.target_link_with_u = curr.target_link;
    //       existing.short_url_with_u = curr.short_url;
    //       existing.portfolio_title_with_u = curr.portfolio_title;
    //     } else {
    //       existing.target_link_without_u = curr.target_link;
    //       existing.short_url_without_u = curr.short_url;
    //       existing.portfolio_title_without_u = curr.portfolio_title;
    //     }
    //   } else {
    //     const newItem = {
    //       type: curr.type,
    //       is_u: curr.is_u,
    //       target_link_without_u: curr.is_u ? null : curr.target_link,
    //       target_link_with_u: curr.is_u ? curr.target_link : null,
    //       short_url_without_u: curr.is_u ? null : curr.short_url,
    //       short_url_with_u: curr.is_u ? curr.short_url : null,
    //       portfolio_title_without_u: curr.is_u ? null : curr.portfolio_title,
    //       portfolio_title_with_u: curr.is_u ? curr.portfolio_title : null
    //     };
    //     acc.push(newItem);
    //   }
    //   return acc;
    // }, []);

    // const existingRecords = await this._tiny_url.findAll();
    // const newPortfolioLinks = new Set(results.map((result) => result.portfolio_link_tmp));
    // const existingPortfolioLinks = new Set(existingRecords.map((record) => record.portfolio_link));
    // const portfolioLinksToRemove = [...existingPortfolioLinks].filter((link) => !newPortfolioLinks.has(link));
    // if (portfolioLinksToRemove.length > 0) {
    //   await this._tiny_url.destroy({ where: { portfolio_link: portfolioLinksToRemove } });
    // }

    // Insert the data into the tiny_urls table
    // for (const result of results) {
    //   try {
    //     // Create a new row in the tiny_urls table for each entry in the query result
    //     await this._tiny_url.create({
    //       portfolio_link: result.portfolio_link_tmp,
    //       tiny_url: result.tiny_url,
    //       tiny_url_u: result.tiny_url_u
    //     });
    //   } catch (error) {
    //     // Handle any errors that occur during the insertion
    //     console.error('Error inserting data:', error);
    //   }
    // }

    return results;
  }

  async list_tiny_url(req) {
    const listTiny_url = await this._tiny_url.findAll();
    return listTiny_url;
  }


  async addTinyUrl(req) {
    // Check if a record with the given portfolio_link exists in the database
    const existingRecord = await this._tiny_url.findOne({ where: { portfolio_link: req.portfolio_link } });

    if (!existingRecord) {
      // If the record does not exist, return an error or throw an exception
      throw new Error(`Record with portfolio_link '${req.portfolio_link}' not found`);
    } else {
      // If the record exists, update the fields
      const updatedFields = {};

      // Update tiny_url if it is provided
      if (req.tiny_url !== undefined) {
        updatedFields.tiny_url = req.tiny_url;
      }

      // Update tiny_url_u if it is provided
      if (req.tiny_url_u !== undefined) {
        updatedFields.tiny_url_u = req.tiny_url_u;
      }

      // Update the existing record with the new values for tiny_url and tiny_url_u
      const updatedRecord = await existingRecord.update(updatedFields);

      return updatedRecord;
    }
  }

  async add(body) {
    const url = await this._tiny_url.bulkCreate(body);

    return updatedRecord;
  }

  async getURLByID(req) {
    const res = await this._tiny_url.findOne({ where: { uniqe_id: req.body.unique_id } });

    return res;
  }

  async generateTinyUrls(body) {
    try {
      const isTinyUrlsExist = await this._tiny_url.findOne({
        where: {
          detail_profile_id: body.detailProfileId
        }
      });

      if (isTinyUrlsExist) {
        await this._tiny_url.destroy({
          where: {
            detail_profile_id: body.detailProfileId
          }
        });
      }

      const mainProfile = await this._detailProfileModel.findOne({
        where: {
          id: body.detailProfileId
        },
        attributes: ['main_profile_id', 'unique_id', 'portfolios_ids'
        ]
      });

      const mainProfileId = mainProfile.dataValues.main_profile_id;
      const uniqueId = mainProfile.dataValues.unique_id;
      const Domain = await this._mainProfileModel.findOne({
        where: {
          id: mainProfileId
        },
        attributes: ['domain']
      });

      const domain = Domain.dataValues.domain;
      const data = [
        { target_link: `${domain}/${uniqueId}`, type: "profile", is_u: false, main_profile_id: mainProfileId, detail_profile_id: body.detailProfileId },
        { target_link: `${domain}/${uniqueId}?u=_`, type: "profile", is_u: true, main_profile_id: mainProfileId, detail_profile_id: body.detailProfileId },
        { target_link: `${domain}/${uniqueId}/cv`, type: "cv", is_u: false, main_profile_id: mainProfileId, detail_profile_id: body.detailProfileId },
        { target_link: `${domain}/${uniqueId}/cv?u=_`, type: "cv", is_u: true, main_profile_id: mainProfileId, detail_profile_id: body.detailProfileId },
        { target_link: `${domain}/${uniqueId}/contact-me`, type: "contact", is_u: false, main_profile_id: mainProfileId, detail_profile_id: body.detailProfileId },
        { target_link: `${domain}/${uniqueId}/contact-me?u=_`, type: "contact", is_u: true, main_profile_id: mainProfileId, detail_profile_id: body.detailProfileId },
        { target_link: `${domain}/${uniqueId}/offer`, type: "offer", is_u: false, main_profile_id: mainProfileId, detail_profile_id: body.detailProfileId },
        { target_link: `${domain}/${uniqueId}/offer?u=_`, type: "offer", is_u: true, main_profile_id: mainProfileId, detail_profile_id: body.detailProfileId },
        { target_link: `${domain}/${uniqueId}/portfolio`, type: "portfolio_main", is_u: false, main_profile_id: mainProfileId, detail_profile_id: body.detailProfileId },
        { target_link: `${domain}/${uniqueId}/portfolio?u=_`, type: "portfolio_main", is_u: true, main_profile_id: mainProfileId, detail_profile_id: body.detailProfileId },
        { target_link: `${domain}/${uniqueId}/blog-listing`, type: "blog", is_u: false, main_profile_id: mainProfileId, detail_profile_id: body.detailProfileId },
        { target_link: `${domain}/${uniqueId}/blog-listing?u=_`, type: "blog", is_u: true, main_profile_id: mainProfileId, detail_profile_id: body.detailProfileId }
      ];

      const portfolios = mainProfile.dataValues.portfolios_ids;
      if (portfolios.portfolio_ids.length > 0) {
        for (let i = 0; i < portfolios.portfolio_ids.length; i++) {
          data.push({
            target_link: `${domain}/${uniqueId}/portfolio/${portfolios.portfolio_ids[i]}?u=_`,
            type: "portfolio_detail",
            is_u: true,
            main_profile_id: mainProfileId,
            detail_profile_id: body.detailProfileId,
            portfolio_id: portfolios.portfolio_ids[i]
          }, {
            target_link: `${domain}/${uniqueId}/portfolio/${portfolios.portfolio_ids[i]}`,
            type: "portfolio_detail",
            is_u: false,
            main_profile_id: mainProfileId,
            detail_profile_id: body.detailProfileId,
            portfolio_id: portfolios.portfolio_ids[i]
          })
        }
      }



      let response = {}

      const transaction = await sequelize.transaction();
      try {
        await this._tiny_url.bulkCreate(data, { transaction });
        await transaction.commit();
        response = {
          message: 'Tiny Urls Generated Successfully'
        }
      }
      catch (error) {
        await transaction.rollback();
        // console.log('error', error?[0]?.errors);
        response = {
          status: 'Error',
          message: JSON.stringify(error).includes('unique violation') ? 'Tiny URL already exists. Try Again' : 'Something went wrong while generating tiny urls'
        }
      }

      return response;
    }
    catch (err) {
      throw new Error(err);
    }
  }

  async getTinyUrlDetail(body) {
    try {
      const tinyUrlDetail = await this._tiny_url.findOne({
        where: {
          uniqe_id: body.uniqueId
        }
      });

      if (!tinyUrlDetail) {
        return { message: 'No Record Found' }
      }
      return tinyUrlDetail;

    }
    catch (err) {
      throw new Error(err);
    }
  }
}










