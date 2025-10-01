import {
  ProductModel,
  UserModel,
  PhotoModel,
  SkillModel,
  experienceModel,
  protfolioModel,
  mainProfileModel,
  detailProfileModel,
  EmailTemplateModel,
  LeadsModel,
  EducationModel,
  tiny_url,
  DynamicGenerationModel,
  CategoryModel,
  TestimonialsModel,
  VideoModel,
} from '../models';

class baseService {
  _userModel;
  _photoModel;
  _skillModel;
  _experienceModel;
  _portfolioModel;
  _mainProfileModel;
  _detailProfileModel;
  _emailTemplate;
  _leadModel;
  _educationModel;
  _tiny_url;
  _dynamicGenerationModel;
  _categoryModel;
  _testimonialsModel;
  _videoModel;

  constructor() {
    this._userModel = UserModel;
    this._photoModel = PhotoModel;
    this._skillModel = SkillModel;
    this._experienceModel = experienceModel;
    this._portfolioModel = protfolioModel;
    this._mainProfileModel = mainProfileModel;
    this._detailProfileModel = detailProfileModel;
    this._emailTemplate = EmailTemplateModel;
    this._leadModel = LeadsModel;
    this._educationModel = EducationModel;
    this._tiny_url = tiny_url;
    this._dynamicGenerationModel = DynamicGenerationModel;
    this._categoryModel = CategoryModel;
    this._testimonialsModel = TestimonialsModel;
    this._videoModel = VideoModel;
  }
}

export default baseService;
