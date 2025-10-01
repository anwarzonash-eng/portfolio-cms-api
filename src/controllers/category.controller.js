import baseController from './base.controller';
import { validationMiddleware } from '../middleware';
import { CategoryDto, filteredListDto } from '../dtos';

class categoryController extends baseController {
  constructor() {
    super('/category');
    this.initializeRouter();
  }

  initializeRouter() {
    this.router.post(
      `${this.parentRouterPath}/sync`,
      validationMiddleware(CategoryDto),
      this.syncCategory
    );
    this.router.post(
      `${this.parentRouterPath}/filteredListforPictureOfServices`,
      validationMiddleware(filteredListDto),
      this.filteredListforPictureOfServices
    );
  }

  syncCategory = async (req, res, next) => {
    try {
      if (req.body.actionType == 'list') {
        const categoryData = await this._categoryService.list();
        res.send(this._responseTemplate('Success', categoryData, undefined));
      } else {
        let categoryData = await this._categoryService.syncCategory(req);
        categoryData = await this._categoryService.list();
        res.send(this._responseTemplate('Success', categoryData, undefined));
      }
    } catch (error) {
      next(error);
    }
  };

  filteredListforPictureOfServices = async (req, res, next) => {
    try {
      let data = await this._categoryService.filteredListforPictureOfServices(
        req
      );

      res.send(this._responseTemplate('Success', data, undefined));
    } catch (error) {
      next(error);
    }
  };
}

export default categoryController;
