import authController from './auth.controller.js';
import photoController from './photo.controller.js';
import skillController from './skills.controller.js';
import experienceController from './experience.controller.js';
import portfolioController from './portfolio.controller.js';
import mainProfileController from './mainProfile.controller.js';
import detailsProfileController from './detailProfile.controller.js';
import reportsController from './reports.controller.js';
import leadsController from './leads.controller.js';
import educationController from './education.controller.js';
import tiny_url from './tiny_url.js';
import dynamicGenerationController from './dynamicGeneration.controller.js';
import skillFinderController from './skillFinder.controller.js';
import dynamicDetailProfileController from './dynamicDetailProfile.controller.js';
import categoryController from './category.controller.js';
import testimonialsController from './testimonials.controller.js';
import videoController from './video.controller.js';

export const controllers = function name() {
  return [
    new authController(),
    new photoController(),
    new skillController(),
    new experienceController(),
    new portfolioController(),
    new mainProfileController(),
    new detailsProfileController(),
    new reportsController(),
    new leadsController(),
    new educationController(),
    new tiny_url(),
    new dynamicGenerationController(),
    new skillFinderController(),
    new dynamicDetailProfileController(),
    new categoryController(),
    new testimonialsController(),
    new videoController(),
  ];
};
