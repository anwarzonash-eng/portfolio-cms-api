import { response } from 'express';
import baseService from './base.service';
import { sequelize } from '../utils/database';
import { checkRecord } from '../utils/checkRecord';
import { deletePhotoWhileUpdate } from '../utils/deletePhotoWhileUpdate';

const uploadPhoto = require('../utils/aws/s3');

export class experienceService extends baseService {
  async sync(req) {
    let response;
    let thumbnail = '';

    if (req.body.actionType === 'add') {
      thumbnail = await uploadPhoto.uploadRequest(req.files.thumbnail);
    }

    if (req.body.actionType === 'add') {
      response = await this._experienceModel.create({
        title: req.body.title,
        private_title: req.body.privateTitle,
        main_profile_id: req.body.mainProfileId,
        catagory: req.body.catagory,
        short_description: req.body.shortDescription,
        long_description: req.body.longDescription,
        app_worked_description: req.body.appWorkedDescription,
        tech_descriptions: req.body.techDescriptions,
        company_name: req.body.companyName,
        company_website: req.body.companyWebsite,
        company_linkedIn: req.body.companyLinkedIn,
        skills_ids: JSON.parse(req.body.skillsIds),
        starting_date: req.body.startingDate,
        ending_Date: req.body.endingDate,
        working: req.body.working,
        thumbnail: thumbnail,
        content_nature: req.body.contentNature,
        companytype: req.body.companytype,
      });
    } else if (req.body.actionType === 'update') {
      const existingExperience = await this._experienceModel.findOne({
        where: { id: req.body.id },
      });

      if (!existingExperience) {
        throw new Error('Experience record not found.');
      }

      let bodyPayload = {
        title: req.body.title,
        private_title: req.body.privateTitle,
        main_profile_id: req.body.mainProfileId,
        catagory: req.body.catagory,
        short_description: req.body.shortDescription,
        long_description: req.body.longDescription,
        app_worked_description: req.body.appWorkedDescription,
        tech_descriptions: req.body.techDescriptions,
        company_name: req.body.companyName,
        company_website: req.body.companyWebsite,
        company_linkedIn: req.body.companyLinkedIn,
        skills_ids: JSON.parse(req.body.skillsIds),
        starting_date: req.body.startingDate,
        ending_Date: req.body.endingDate,
        working: req.body.working,
        content_nature: req.body.contentNature,
        companytype: req.body.companytype,
      };
      if (!req.body.thumbnail) {
        thumbnail = await deletePhotoWhileUpdate({
          fileData: req.files,
          fileInFileData: req.files.thumbnail,
          existingFile: existingExperience.thumbnail,
        });
        bodyPayload.thumbnail = thumbnail;
      }

      const [rowsUpdated, updatedUser] = await this._experienceModel.update(
        bodyPayload,
        {
          where: { id: req.body.id },
          returning: true,
        }
      );
      // console.log(rowsUpdated, updatedUser);

      response = updatedUser;
    } else if (req.body.actionType === 'delete') {
      const experienceIdToDelete = req.body.id;
      const detailExpereincePresent = await checkRecord(
        this._detailProfileModel,
        experienceIdToDelete,
        'experiences_ids'
      );

      if (detailExpereincePresent) {
        throw new Error(
          'Cannot delete the expereince as it is present in detail profile.'
        );
      }

      const [rowsUpdated, updatedUser] = await this._experienceModel.update(
        { is_deleted: true },
        {
          where: { id: experienceIdToDelete },
          returning: true,
        }
      );
      // console.log(rowsUpdated, updatedUser);
      response = updatedUser;
    }

    return response;
  }

  async list(mainProfileId, contentNature, companytype, id) {
    let whereClause = '';
    if (id) {
      whereClause = `WHERE id = '${id}'`;
    } else {
      whereClause = `
        WHERE
      
    _experiences_parent.is_deleted = false
    AND _experiences_parent.main_profile_id = '${mainProfileId}'
        AND _experiences_parent.content_nature = '${contentNature}'
        AND _experiences_parent.companytype = '${companytype}'
      `;
    }
    const query = `select
    id,
        title,
        private_title,
        main_profile_id,
        short_description,
        long_description,
        app_worked_description,
        tech_descriptions,
        company_name,
        companytype,
        company_website,
        catagory,
        "company_linkedIn",
        "thumbnail",
        "starting_date",
        "ending_Date",
        "updatedAt",
        "working",
        "content_nature",
        "duplicate",
    (
      select
        json_agg(
          json_build_object('id', _skills.id, 'title', _skills.title, 'url', _skills.url, 'order', _skills.order)
        ) as skills_ids
      from
        "Experiences" _experiences_child,
        json_array_elements_text(skills_ids -> 'skills_ids') as fk
        join "Skills" _skills on _skills.id = fk :: uuid
      where
        _experiences_parent.id = _experiences_child.id
    ) AS skill
  from
    "Experiences" _experiences_parent
   ${whereClause}`;

    const results = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    return results;
  }

  async duplicateExperience(originalExperienceId) {
    const originalExperience = await this._experienceModel.findOne({
      where: { id: originalExperienceId },
    });

    if (!originalExperience) {
      throw new Error('Experience not found.');
    }

    const duplicatedExperience = {
      title: originalExperience.title,
      private_title: originalExperience.private_title,
      main_profile_id: originalExperience.main_profile_id,
      short_description: originalExperience.short_description,
      long_description: originalExperience.long_description,
      app_worked_description: originalExperience.app_worked_description,
      tech_descriptions: originalExperience.tech_descriptions,
      company_name: originalExperience.company_name,
      company_website: originalExperience.company_website,
      company_linkedIn: originalExperience.company_linkedIn,
      skills_ids: originalExperience.skills_ids,
      starting_date: originalExperience.starting_date,
      ending_Date: originalExperience.ending_Date,
      thumbnail: originalExperience.thumbnail,
      catagory: originalExperience.catagory,
      working: originalExperience.working,
      content_nature: originalExperience.content_nature,
      companytype: originalExperience.companytype,
      duplicate: 'Yes',
    };

    await this._experienceModel.create(duplicatedExperience);

    return duplicatedExperience;
  }

  async newExperiencelist() {
    const results = await this._experienceModel.findAll({
      where: { is_deleted: false },
    });

    return results;
  }
}
