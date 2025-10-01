import baseController from './base.controller';
import { validationMiddleware, authMiddleware } from '../middleware';
import { Env } from '../config';
import { getPortfoliosByDetailProfileIdDto, portfolioDto } from '../dtos';
import userNotAuthorizaedException from '../exceptions/userNotAuthorizaed.exception';
const uploadPhoto = require('../utils/aws/s3');

class portfolioController extends baseController {
  constructor() {
    super('/portfolio');
    this.initializeRouter();
  }

  initializeRouter() {
    this.router.post(
      `${this.parentRouterPath}/sync`,
      // validationMiddleware(portfolioDto),
      this.sync
    );
    this.router.post(`${this.parentRouterPath}/duplicate`, this.duplicate);
    this.router.post(`${this.parentRouterPath}/sendemail`, this.sendEmail);
    this.router.get(
      `${this.parentRouterPath}/listforTestimonials`,
      this.listforTestimonials
    );

    this.router.post(
      `${this.parentRouterPath}/isForCypexsoft`,
      this.isForCypexsoft
    );

    this.router.get(
      `${this.parentRouterPath}/detailPortfolioForCypexsoft/:portfolio_id`,
      this.detailPortfolioForCypexsoft
    );

    this.router.post(
      `${this.parentRouterPath}/updateOrderToDisplay`,

      this.updateOrderToDisplay
    );
    this.router.post(
      `${this.parentRouterPath}/newPortfoliolist`,

      this.newPortfoliolist
    );

    // get portfolios list by detail profile Id
    this.router.post(`${this.parentRouterPath}/getPortfolioListByDetailProfile`,
      validationMiddleware(getPortfoliosByDetailProfileIdDto), this.getPortfoliosByDetailProfile
    );
  }

  sync = async (req, res, next) => {
    try {
      if (req.body.actionType == 'list') {
        // console.log('req.body', req.body);
        const skillsData = await this._portfolioService.list(
          req.body.contentNature,
          req.body.mainProfileId,
          req.body.categorys,
          req.body.has_testimonial,
          req.body.companytype,
          req.body.id
        );
        res.send(this._responseTemplate('Success', skillsData, undefined));
      } else {
        let skillsData = await this._portfolioService.sync(req);

        skillsData = await this._portfolioService.list(
          req.body.contentNature,
          req.body.mainProfileId,
          req.body.categorys,
          req.body.has_testimonial,
          req.body.companytype
        );
        res.send(this._responseTemplate('Success', skillsData, undefined));
      }
    } catch (error) {
      next(error);
    }
  };
  duplicate = async (req, res, next) => {
    try {
      const originalPortfolioId = req.body.id;
      const duplicatedPortfolio =
        await this._portfolioService.duplicatePortfolio(originalPortfolioId);

      res.send(
        this._responseTemplate('Success', duplicatedPortfolio, undefined)
      );
    } catch (error) {
      next(error);
    }
  };
  sendEmail = async (req, res, next) => {
    try {
      await this._portfolioService.sendEmail(req);

      res.send(
        this._responseTemplate('Success', { message: 'email sent' }, undefined)
      );
    } catch (error) {
      next(error);
    }
  };

  listforTestimonials = async (req, res, next) => {
    try {
      const data = await this._portfolioService.listforTestimonials(req);
      res.send(this._responseTemplate('Success', data, undefined));
    } catch (error) {
      next(error);
    }
  };

  newPortfoliolist = async (req, res, next) => {
    try {
      const data = await this._portfolioService.newPortfoliolist(req);
      res.send(this._responseTemplate('Success', data, undefined));
    } catch (error) {
      next(error);
    }
  };

  isForCypexsoft = async (req, res, next) => {
    try {
      const data = await this._portfolioService.isForCypexsoft(req);
      res.send(this._responseTemplate('Success', data, undefined));
    } catch (error) {
      next(error);
    }
  };

  detailPortfolioForCypexsoft = async (req, res, next) => {
    try {
      const data = await this._portfolioService.isForCypexsoft(req, true);
      res.send(this._responseTemplate('Success', data, undefined));
    } catch (error) {
      next(error);
    }
  };

  updateOrderToDisplay = async (req, res, next) => {
    try {
      const data = await this._portfolioService.updateOrderToDisplay(req);
      res.send(this._responseTemplate('Success', data, undefined));
    } catch (error) {
      next(error);
    }
  };

  getPortfoliosByDetailProfile = async (req, res, next) => {
    try {
      const data = await this._portfolioService.getPortfoliosByDetailProfileId(req);
      res.send(this._responseTemplate('Success', data, undefined));
    }
    catch (error) {
      next(error);
    }
  };
}

export default portfolioController;
