import { response } from 'express';
import baseService from './base.service';
import { sequelize } from '../utils/database';
import { checkRecord } from '../utils/checkRecord';
import { deletePhotoWhileUpdate } from '../utils/deletePhotoWhileUpdate';

const uploadPhoto = require('../utils/aws/s3');

export class skillService extends baseService {
  async syncSkill(req) {
    let response;
    let icon = '';

    if (req.body.actionType === 'add') {
      icon = await uploadPhoto.uploadRequest(req.files.icon);
    }

    if (req.body.actionType === 'add') {
      response = await this._skillModel.create({
        skills_ids: JSON.parse(req.body.skillsIds),
        title: req.body.title,
        url: req.body.url,
        catagory: req.body.catagory,
        description: req.body.description,
        variation: req.body.variation,
        order: req.body.order,
        companytype: req.body.companytype,
        is_techstack: req.body.is_techstack,
        icon: icon,
      });
    } else if (req.body.actionType === 'update') {
      const existingSkill = await this._skillModel.findOne({
        where: { id: req.body.id },
      });

      if (!existingSkill) {
        throw new Error('Skill record not found.');
      }
      let bodyPayload = {
        skills_ids: JSON.parse(req.body.skillsIds),
        title: req.body.title,
        url: req.body.url,
        catagory: req.body.catagory,
        description: req.body.description,
        variation: req.body.variation,
        order: req.body.order,
        companytype: req.body.companytype,
        is_techstack: req.body.is_techstack,
      };
      
      /*if (!req.body.icon) {
        icon = await deletePhotoWhileUpdate({
          fileData: req.files,
          fileInFileData: req.files.icon,
          existingFile: existingSkill.icon,
        });
        bodyPayload.icon = icon;
      }
      */

      const [rowsUpdated, updatedUser] = await this._skillModel.update(
        bodyPayload,
        {
          where: { id: req.body.id },
          returning: true,
        }
      );

      response = updatedUser;
    } else if (req.body.actionType === 'delete') {
      const skillIdToDelete = req.body.id;
      const experiencesSkillPresent = await checkRecord(
        this._experienceModel,
        skillIdToDelete,
        'skills_ids'
      );

      const portfoliosSkillPresent = await checkRecord(
        this._portfolioModel,
        skillIdToDelete,
        'skills_ids_shorts'
      );

      if (experiencesSkillPresent || portfoliosSkillPresent) {
        throw new Error(
          'Cannot delete the skill as it is present in other records.'
        );
      }

      const [rowsUpdated, updatedSkill] = await this._skillModel.update(
        { is_deleted: true },
        {
          where: { id: skillIdToDelete },
          returning: true,
        }
      );
      // console.log(rowsUpdated, updatedSkill);
      response = updatedSkill;
    }

    return response;
  }

  // async list() {
  //   const results = await this._skillModel.findAll({
  //     where: { is_deleted: false },
  //     order: [['title', 'ASC']],
  //   });

  //   return results;
  // }

  async list() {
    const query = `select
    id,
    title,
    url,
    catagory,
    description,
  variation,
    "order",
    icon,
    "is_techstack",
companytype,

    (
        select
          json_agg(
            json_build_object('id', _skills.id, 'title', _skills.title, 'url', _skills.url, 'order', _skills.order)
          ) as skills_ids
        from
          "Skills" _skill_child,
          json_array_elements_text(skills_ids -> 'skills_ids') as fk
          join "Skills" _skills on _skills.id = fk :: uuid
        where
          _skill_parent.id = _skill_child.id
      ) AS siblings
    from
      "Skills" _skill_parent
      where
      _skill_parent.is_deleted = false
            `;

    const results = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    return results;
  }
}
