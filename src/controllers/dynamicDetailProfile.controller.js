import baseController from './base.controller';
import { validationMiddleware, authMiddleware } from '../middleware';
import { Env } from '../config';
import {
  detailProfileDto,
  dynamicDetailProfiledto,
  duplicateDto,
} from '../dtos';
const uploadPhoto = require('../utils/aws/s3');

class dynamicDetailProfileController extends baseController {
  constructor() {
    super('/dynamic_detProfile');
    this.initializeRouter();
  }

  initializeRouter() {
    this.router.post(
      `${this.parentRouterPath}/add`,
      validationMiddleware(dynamicDetailProfiledto),
      this.dynamicGenertiondetailprofile
    );
    this.router.post(
      `${this.parentRouterPath}/findmatchedProfile`,

      this.findMatchedProfiles
    );



  }

  dynamicGenertiondetailprofile = async (req, res, next) => {
    try {
      const dgpData =
        await this._dynamicdetailProfileService.dynamicGenertiondetailprofile(
          req
        );
      res.send(this._responseTemplate('Success', dgpData, undefined));
    } catch (error) {
      next(error);
    }
  };

  findMatchedProfiles = async (req, res, next) => {
    try {
      const dgpData =
        await this._skillFinderService.findMatchedSkillsProfiles(
          req
        );
      res.send(this._responseTemplate('Success', dgpData, undefined));
    } catch (error) {
      next(error);
    }
  };
}

export default dynamicDetailProfileController;
