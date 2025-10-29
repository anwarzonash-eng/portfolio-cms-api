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
    this.router.post(
      `${this.parentRouterPath}/add`,
      this.add
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

  add = async (req, res) => {
    try {

      const response = await this._dynamicGenerationService.add(req);
      res.send(this._responseTemplate('Success', response, undefined))

    } catch (error) {
      res.send(this._responseTemplate('Error', undefined, error))
    }
  };


}

export default dynamicGenerationController;
