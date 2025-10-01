import baseController from './base.controller';
import { validationMiddleware, authMiddleware } from '../middleware';
import { Env } from '../config';
import { experienceDto } from '../dtos';
import userNotAuthorizaedException from '../exceptions/userNotAuthorizaed.exception';
const uploadPhoto = require('../utils/aws/s3');

class experienceController extends baseController {
  constructor() {
    super('/experience');
    this.initializeRouter();
  }

  initializeRouter() {
    this.router.post(
      `${this.parentRouterPath}/sync`,
      validationMiddleware(experienceDto),
      this.sync
    );
    this.router.post(`${this.parentRouterPath}/duplicate`, this.duplicate);
    this.router.post(
      `${this.parentRouterPath}/newExperiencelist`,
      this.newExperiencelist
    );
  }

  sync = async (req, res, next) => {
    try {
      if (req.body.actionType == 'list') {
        const skillsData = await this._experienceService.list(
          req.body.mainProfileId,
          req.body.contentNature,
          req.body.companytype,
          req.body.id
        );
        res.send(this._responseTemplate('Success', skillsData, undefined));
      } else {
        let skillsData = await this._experienceService.sync(req);

        skillsData = await this._experienceService.list(
          req.body.mainProfileId,
          req.body.contentNature,
          req.body.companytype
        );
        res.send(this._responseTemplate('Success', skillsData, undefined));
      }
    } catch (error) {
      next(error);
    }
  };

  listSkills = async (req, res, next) => {
    try {
      if (req.userData) new userNotAuthorizaedException();

      // console.log(req.body);

      const skillsData = await this._skillService.listSkills();
      res.send(this._responseTemplate('Success', skillsData, undefined));
    } catch (error) {
      // let obj = new databaseException()
      // next(new NotFoundException('There is a problem'))
      next(error);
    }
  };

  duplicate = async (req, res, next) => {
    try {
      const originalExperienceId = req.body.id;
      const duplicatedExperience =
        await this._experienceService.duplicateExperience(originalExperienceId);

      res.send(
        this._responseTemplate('Success', duplicatedExperience, undefined)
      );
    } catch (error) {
      next(error);
    }
  };

  newExperiencelist = async (req, res, next) => {
    try {
      const data = await this._experienceService.newExperiencelist(req);
      res.send(this._responseTemplate('Success', data, undefined));
    } catch (error) {
      next(error);
    }
  };
}

export default experienceController;
