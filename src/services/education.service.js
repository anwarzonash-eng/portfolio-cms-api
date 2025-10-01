import { response } from 'express';
import baseService from './base.service';
import { sequelize } from '../utils/database';
import { checkRecord } from '../utils/checkRecord';
import { deletePhotoWhileUpdate } from '../utils/deletePhotoWhileUpdate';

const uploadPhoto = require('../utils/aws/s3');

export class educationService extends baseService {
  async syncEducation(req) {
    let response;

    let thumbnail = '';

    if (req.body.actionType === 'add') {
      thumbnail = await uploadPhoto.uploadRequest(req.files.thumbnail);
    }

    if (req.body.actionType === 'add') {
      response = await this._educationModel.create({
        university_name: req.body.university_name,
        private_title: req.body.private_title,
        main_profile_id: req.body.mainProfileId,
        university_website_link: req.body.university_website_link,
        degree_name: req.body.degree_name,
        degree_start_date: req.body.degree_start_date,
        degree_end_date: req.body.degree_end_date,
        degree_description: req.body.degree_description,
        thumbnail: thumbnail,
      });
    } else if (req.body.actionType === 'update') {
      const existingEducation = await this._educationModel.findOne({
        where: { id: req.body.id },
      });

      if (!existingEducation) {
        throw new Error('Education record not found.');
      }
      let bodyPayload = {
        university_name: req.body.university_name,
        private_title: req.body.private_title,
        main_profile_id: req.body.mainProfileId,
        university_website_link: req.body.university_website_link,
        degree_name: req.body.degree_name,
        degree_start_date: req.body.degree_start_date,
        degree_end_date: req.body.degree_end_date,
        degree_description: req.body.degree_description,
      };
      if (!req.body.thumbnail) {
        thumbnail = await deletePhotoWhileUpdate({
          fileData: req.files,
          fileInFileData: req.files.thumbnail,
          existingFile: existingEducation.thumbnail,
        });
        bodyPayload.thumbnail = thumbnail;
      }

      const [rowsUpdated, updatedUser] = await this._educationModel.update(
        bodyPayload,

        {
          where: { id: req.body.id },
          returning: true,
        }
      );
      // console.log(rowsUpdated, updatedUser);

      response = updatedUser;
    } else if (req.body.actionType === 'delete') {
      const educationIdToDelete = req.body.id;
      const detailPortfolioPresent = await checkRecord(
        this._detailProfileModel,
        educationIdToDelete,
        'education_ids'
      );

      if (detailPortfolioPresent) {
        throw new Error(
          'Cannot delete the education as it is present in detail profile.'
        );
      }

      const [rowsUpdated, updatedUser] = await this._educationModel.update(
        { is_deleted: true },
        {
          where: { id: educationIdToDelete },
          returning: true,
        }
      );
      // console.log(rowsUpdated, updatedUser);
      response = updatedUser;
    }

    return response;
  }

  async list() {
    const results = await this._educationModel.findAll({
      where: { is_deleted: false },
      order: [['degree_name', 'ASC']],
    });

    return results;
  }
}
