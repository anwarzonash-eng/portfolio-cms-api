import { response } from 'express';
import baseService from './base.service';
import { sequelize } from '../utils/database';
import { checkRecord } from '../utils/checkRecord';
import { deletePhotoWhileUpdate } from '../utils/deletePhotoWhileUpdate';
const uploadPhoto = require('../utils/aws/s3');

export class categoryService extends baseService {
  async syncCategory(req) {
    let response;

    let thumbnail = '';

    if (req.body.actionType === 'add') {
      thumbnail = await uploadPhoto.uploadRequest(req.files.thumbnail);
    }

    if (req.body.actionType === 'add') {

      response = await this._categoryModel.create({
        skills_ids: JSON.parse(req.body.skillsIds),
        title: req.body.title,
        label: req.body.label,
        tagline: req.body.tagline,
        intro_heading: req.body.intro_heading,
        intro: req.body.intro,
        mainIntro_heading: req.body.mainIntro_heading,
        designation: req.body.designation,
        mainIntro: req.body.mainIntro,
        is_category_static: req.body.is_category_static,
        experience_intro: JSON.parse(req.body.experienceIntro),
        companytype: req.body.companytype,
        short_description: req.body.short_description,
        thumbnail: thumbnail,
        main_profile_id: req.body.main_profile_id
      });

      return await this.list();
    } else if (req.body.actionType === 'update') {
      const existingCategory = await this._categoryModel.findOne({
        where: { id: req.body.id },
      });

      if (!existingCategory) {
        throw new Error('Category record not found.');
      }
      let bodyPayload = {
        skills_ids: JSON.parse(req.body.skillsIds),
        title: req.body.title,
        label: req.body.label,
        tagline: req.body.tagline,
        intro_heading: req.body.intro_heading,
        intro: req.body.intro,
        mainIntro_heading: req.body.mainIntro_heading,
        designation: req.body.designation,
        mainIntro: req.body.mainIntro,
        is_category_static: req.body.is_category_static,
        short_description: req.body.short_description,
        experience_intro: JSON.parse(req.body.experienceIntro),
        companytype: req.body.companytype,
      };

      /*if (!req.body.thumbnail) {
        thumbnail = await deletePhotoWhileUpdate({
          fileData: req.files,
          fileInFileData: req.files.thumbnail,
          existingFile: existingCategory.thumbnail,
        });
        bodyPayload.thumbnail = thumbnail;
      }
      */

      const [rowsUpdated, updatedUser] = await this._categoryModel.update(
        bodyPayload,

        {
          where: { id: req.body.id },
          returning: true,
        }
      );

      response = updatedUser;
      return await this.list();
    } else if (req.body.actionType === 'delete') {
      const categoryIdToDelete = req.body.label;
      // console.log('categoryIdToDelete', categoryIdToDelete);
      const SkillPresent = await checkRecord(
        this._skillModel,
        categoryIdToDelete,
        'catagory'
      );

      if (SkillPresent) {
        throw new Error(
          'Cannot delete the category as it is present in other records.'
        );
      }

      const [rowsUpdated, updatedCategory] = await this._categoryModel.update(
        { is_deleted: true },
        {
          where: { label: categoryIdToDelete },
          returning: true,
        }
      );

      response = updatedCategory;
    }

    return response;
  }

  async list() {
    const results = await this._categoryModel.findAll({
      where: { is_deleted: false },
    });

    return results;
  }

  async filteredListforPictureOfServices(req) {
    const idToFind = req.body.id;

    const result = await this._categoryModel.findOne({
      where: {
        id: idToFind,
        is_deleted: false,
      },
    });

    const dataToSend = {
      id: result?.id,
      thumbnail: result?.thumbnail,
      title: result?.title,
    };

    return dataToSend;
  }
}
