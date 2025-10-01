import baseController from './base.controller';
import { validationMiddleware } from '../middleware';
import { testimonialsDto } from '../dtos';

class testimonialsController extends baseController {
  constructor() {
    super('/testimonials');
    this.initializeRouter();
  }

  initializeRouter() {
    this.router.post(
      `${this.parentRouterPath}/sync`,
      validationMiddleware(testimonialsDto),
      this.syncTestimonial
    );
    this.router.post(
      `${this.parentRouterPath}/updateOrderToDisplay`,

      this.updateOrderToDisplay
    );
  }

  syncTestimonial = async (req, res, next) => {
    try {
      if (req.body.actionType == 'list') {
        const testimonialData = await this._testimonialService.list();
        res.send(this._responseTemplate('Success', testimonialData, undefined));
      } else {
        let testimonialData = await this._testimonialService.syncTestimonial(
          req
        );
        testimonialData = await this._testimonialService.list();
        res.send(this._responseTemplate('Success', testimonialData, undefined));
      }
    } catch (error) {
      next(error);
    }
  };

  updateOrderToDisplay = async (req, res, next) => {
    try {
      const data = await this._testimonialService.updateOrderToDisplay(req);
      res.send(this._responseTemplate('Success', data, undefined));
    } catch (error) {
      next(error);
    }
  };
}

export default testimonialsController;
