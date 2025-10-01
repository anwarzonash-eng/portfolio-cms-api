import baseController from './base.controller';
import { validationMiddleware, authMiddleware } from '../middleware';
import { Env } from '../config';
import { detailProfileDto, duplicateDto, uploadCV } from '../dtos';
import userNotAuthorizaedException from '../exceptions/userNotAuthorizaed.exception';
const uploadPhoto = require('../utils/aws/s3');

class detailsProfileController extends baseController {
  constructor() {
    super('/detail_profile');
    this.initializeRouter();
  }

  initializeRouter() {
    this.router.post(
      `${this.parentRouterPath}/sync`,
      validationMiddleware(detailProfileDto),
      this.sync
    );
    this.router.post(
      `${this.parentRouterPath}/duplicate`,
      validationMiddleware(duplicateDto),
      this.duplicate
    );
    this.router.post(
      `${this.parentRouterPath}/uploadCv`,
      validationMiddleware(uploadCV),
      this.uploadCv
    );
  }

  sync = async (req, res, next) => {
    try {
      if (req.body.actionType == 'list') {
        const skillsData = await this._detailProfileService.list(
          req.body.mainProfileId,
          req.body.contentNature,
          req.body.companytype
        );
        res.send(this._responseTemplate('Success', skillsData, undefined));
      } else {
        let skillsData = await this._detailProfileService.sync(req);

        skillsData = await this._detailProfileService.list(
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

      // console.log(req.body)

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
      const originalDetailprofileId = req.body.id;
      const main_profile_id = req.body.main_profile_id;
      const duplicatedDetailprofile =
        await this._detailProfileService.duplicateDetailProfile(
          originalDetailprofileId,
          main_profile_id
        );

      res.send(
        this._responseTemplate('Success', duplicatedDetailprofile, undefined)
      );
    } catch (error) {
      next(error);
    }
  };

  uploadCv = async (req, res, next) => {
    try {
      const data = await this._detailProfileService.uploadCv(req);
      res.send(this._responseTemplate('Success', data, undefined));
    } catch (error) {
      next(error);
    }
  };
}

export default detailsProfileController;
