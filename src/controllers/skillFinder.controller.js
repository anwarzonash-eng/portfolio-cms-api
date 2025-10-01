import baseController from './base.controller';
import { validationMiddleware, authMiddleware } from '../middleware';
import { skillFinderDto } from '../dtos';

class skillFinderController extends baseController {
  constructor() {
    super('/skillFinder');
    this.initializeRouter();
  }

  initializeRouter() {
    this.router.post(
      `${this.parentRouterPath}/find`,
      validationMiddleware(skillFinderDto),
      this.skillFinder
    );
  }

  skillFinder = async (req, res, next) => {
    try {
      const skillFinderData = await this._skillFinderService.skillFinder(req);
      res.send(this._responseTemplate('Success', skillFinderData, undefined));
    } catch (error) {
      next(error);
    }
  };
}

export default skillFinderController;
