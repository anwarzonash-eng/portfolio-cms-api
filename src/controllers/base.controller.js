import express from 'express';

import { authService } from '../services/auth.service.js';
import { photoService } from '../services/photo.service.js';
import { responseTemplate } from '../enums/responseTemplate.enum.js';
import { skillService } from '../services/skill.service.js';
import { experienceService } from '../services/experience.service.js';
import { portfolioService } from '../services/portfolios.service.js';
import { mainProfileService } from '../services/mainProfile.service.js';
import { detailProfileService } from '../services/detailProfile.service.js';
import { reportService } from '../services/reports.service.js';
import { leadService } from '../services/leads.service.js';
import { educationService } from '../services/education.service.js';
import { tiny_url } from '../services/tiny_url.js';
import { dynamicGenerationService } from '../services/dynamicGeneration.service.js';
import { skillFinderService } from '../services/skillFinder.service.js';
import { dynamicdetailProfileService } from '../services/dynamicDetailprofile.service.js';
import { categoryService } from '../services/category.service.js';
import { testimonialsService } from '../services/testimonials.service.js';
import { videoService } from '../services/video.service.js';

class baseController {
  router;
  parentRouterPath;
  _authService;
  _photoService;
  _skillService;
  _experienceService;
  _portfolioService;
  _mainProfileService;
  _detailProfileService;
  _reportService;
  _leadService;
  _educationService;
  _dynamicGenerationService;
  _responseTemplate;
  _sqlRawQueriesEnum;
  _tiny_url;
  _skillFinderService;
  _dynamicdetailProfileService;
  _categoryService;
  _testimonialService;
  _videoService;

  constructor(routerPath) {
    this.parentRouterPath = routerPath;
    this.router = express.Router();

    this._authService = new authService();
    this._photoService = new photoService();
    this._skillService = new skillService();
    this._experienceService = new experienceService();
    this._portfolioService = new portfolioService();
    this._mainProfileService = new mainProfileService();
    this._detailProfileService = new detailProfileService();
    this._reportService = new reportService();
    this._leadService = new leadService();
    this._educationService = new educationService();
    this._dynamicGenerationService = new dynamicGenerationService();
    this._skillFinderService = new skillFinderService();
    this._dynamicdetailProfileService = new dynamicdetailProfileService();
    this._tiny_url = new tiny_url();
    this._responseTemplate = responseTemplate;
    this._categoryService = new categoryService();
    this._testimonialService = new testimonialsService();
    this._videoService = new videoService();
  }
}

export default baseController;
