import { response } from 'express';
import baseService from './base.service';
import { sequelize } from '../utils/database';
import { checkRecord } from '../utils/checkRecord';
import { deletePhotoWhileUpdate } from '../utils/deletePhotoWhileUpdate';

const uploadPhoto = require('../utils/aws/s3');

export class testimonialsService extends baseService {
  async syncTestimonial(req) {
    let response;
    console.log('reqqqqq', req.files);
    let client_pic = '';
    let video = '';

    if (req.body.actionType === 'add') {
      {
        req.files &&
          req.files.client_pic &&
          req.files.client_pic !== 'null' &&
          (client_pic = await uploadPhoto.uploadRequest(req.files.client_pic));
      }
      {
        req.files &&
          req.files.video &&
          req.files.video !== 'null' &&
          (video = await uploadPhoto.uploadRequest(req.files.video));
      }
    }

    if (req.body.actionType === 'add') {
      response = await this._testimonialsModel.create({
        main_profile_id: req.body.main_profile_id,
        review_text: req.body.review_text,
        client_name: req.body.client_name,
        client_designation: req.body.client_designation,
        client_pic: client_pic || null,
        video: video || null,
        client_company: req.body.client_company,
        client_company_website: req.body.client_company_website,
        portfolio_id:
          req.body.portfolio_id !== 'null' ? req.body.portfolio_id : null,
        display_order: req.body.display_order,
      });
    } else if (req.body.actionType === 'update') {
      const existingTestimonial = await this._testimonialsModel.findOne({
        where: { id: req.body.id },
      });

      if (!existingTestimonial) {
        throw new Error('Testimonial not found');
      }
      let bodyPayload = {
        main_profile_id: req.body.main_profile_id,
        review_text: req.body.review_text,
        client_name: req.body.client_name,
        client_designation: req.body.client_designation,
        client_company: req.body.client_company,
        client_company_website: req.body.client_company_website,
        portfolio_id:
          req.body.portfolio_id !== 'null' ? req.body.portfolio_id : null,
        display_order: req.body.display_order,
      };
      if (!req.body.client_pic) {
        client_pic = await deletePhotoWhileUpdate({
          fileData: req.files,
          fileInFileData: req.files.client_pic,
          existingFile: existingTestimonial.client_pic,
        });
        bodyPayload.client_pic = client_pic;
      }
      if (!req.body.video) {
        video = await deletePhotoWhileUpdate({
          fileData: req.files,
          fileInFileData: req.files.video,
          existingFile: existingTestimonial.video,
        });
        bodyPayload.video = video;
      }

      const [rowsUpdated, updatedUser] = await this._testimonialsModel.update(
        bodyPayload,

        {
          where: { id: req.body.id },
          returning: true,
        }
      );
      console.log(rowsUpdated, updatedUser);

      response = updatedUser;
    } else if (req.body.actionType === 'delete') {
      try {
        let testimonialData = await this._testimonialsModel.update(
          { is_deleted: true },
          {
            where: { id: req.body.id },
            returning: true,
          }
        );
        return testimonialData;
      } catch (error) {
        console.log(error);
      }
    }

    return response;
  }

  async list() {
    const results = await this._testimonialsModel.findAll({
      where: { is_deleted: false },
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

      const [updatedRows, [updatedData]] = await this._testimonialsModel.update(
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
}
