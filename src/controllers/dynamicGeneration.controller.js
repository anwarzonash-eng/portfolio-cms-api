import baseController from './base.controller';
import { validationMiddleware } from '../middleware';

import { AddDynamicGenerationDto } from '../dtos';

class dynamicGenerationController extends baseController {
  constructor() {
    super('/dynamicGeneration');
    this.initializeRouter();
  }

  initializeRouter() {
    this.router.post(
      `${this.parentRouterPath}/sync`,
      validationMiddleware(AddDynamicGenerationDto),
      this.sync
    );
  }

  sync = async (req, res, next) => {
    try {
      if (req.body.actionType == 'list') {
        const dynamicGenerationData =
          await this._dynamicGenerationService.listdynamicGeneration();
        res.send(
          this._responseTemplate('Success', dynamicGenerationData, undefined)
        );
      } else {
        let dynamicGenerationData =
          await this._dynamicGenerationService.adddynamicGeneration(req);
        res.send(
          this._responseTemplate('Success', dynamicGenerationData, undefined)
        );
      }
    } catch (error) {
      next(error);
    }
  };
}

export default dynamicGenerationController;
