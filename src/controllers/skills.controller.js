import baseController from './base.controller';
import { validationMiddleware, authMiddleware } from '../middleware';
import { Env } from '../config';
import { AddPhotoDto, SkillsDto, ListPhotosDto } from '../dtos';
import userNotAuthorizaedException from '../exceptions/userNotAuthorizaed.exception';
const uploadPhoto = require('../utils/aws/s3');

class skillController extends baseController {
  constructor() {
    super('/skill');
    this.initializeRouter();
  }

  initializeRouter() {
    this.router.post(
      `${this.parentRouterPath}/sync`,
      validationMiddleware(SkillsDto),
      this.syncSkill
    );
    this.router.post(
      `${this.parentRouterPath}/add`,
      this.addSkill
    );
  }



  syncSkill = async (req, res, next) => {
    try {
      if (req.body.actionType == 'list') {
        const skillsData = await this._skillService.list();
        res.send(this._responseTemplate('Success', skillsData, undefined));
      } else {
        let skillsData = await this._skillService.syncSkill(req);
        skillsData = await this._skillService.list();
        res.send(this._responseTemplate('Success', skillsData, undefined));
      }
    } catch (error) {
      // console.log('error', error);
      next(error);
    }
  };

  addSkill = async (req, res) => {
    try {

      let skillsData = await this._skillService.add(req);
      res.send(this._responseTemplate('Success', skillsData, undefined));
    } catch (error) {
      res.send(this._responseTemplate('Error', undefined, error));
      // console.log('error', error);
      // next(error);
    }
  };
}

export default skillController;
