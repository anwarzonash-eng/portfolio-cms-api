import baseController from "./base.controller";
const uploadPhoto = require("../utils/aws/s3");
import { validationMiddleware } from '../middleware';
import { generateTinyUrlDto, getTinyUrlDetailDto } from "../dtos";

class tiny_url extends baseController {
  constructor() {
    super("/tiny_url");
    this.initializeRouter();
  }

  initializeRouter() {
    this.router.post(`${this.parentRouterPath}/sync`, this.sync);
    this.router.post(`${this.parentRouterPath}/list`, this.list_tiny_url);
    this.router.post(`${this.parentRouterPath}/addTinyUrl`, this.addTinyUrl);
    this.router.post(`${this.parentRouterPath}/geturlbyid`, this.get_url_by_id);

    this.router.post(`${this.parentRouterPath}/generateTinyUrls`, validationMiddleware(generateTinyUrlDto), this.generateTinyUrls);
    this.router.post(`${this.parentRouterPath}/getTinyUrlDetail`, validationMiddleware(getTinyUrlDetailDto), this.getTinyUrlDetail);
  }



  sync = async (req, res, next) => {



    const skillsData = await this._tiny_url.list(req);
    res.send(this._responseTemplate("Success", skillsData, undefined));

  };



  list_tiny_url = async (req, res, next) => {
    try {


      const TUData = await this._tiny_url.list();
      res.send(this._responseTemplate("Success", TUData, undefined));
    } catch (error) {

      next(error);
    }
  };

  get_url_by_id = async (req, res, next) => {
    try {


      const TUData = await this._tiny_url.getURLByID(req);
      res.send(this._responseTemplate("Success", TUData, undefined));
    } catch (error) {

      next(error);
    }
  };



  addTinyUrl = async (req, res, next) => {

    try {


      const addTinyU = await this._tiny_url.addTinyUrl(req.body)
      res.send(this._responseTemplate('Success', addTinyU, undefined))

    } catch (error) {

      next(error)
    }

  }


  generateTinyUrls = async (req, res, next) => {
    try {
      const data = await this._tiny_url.generateTinyUrls(req.body);
      return res.send(data?.status === "Error"
        ? this._responseTemplate('Error', undefined, data.message)
        : this._responseTemplate('Success', data, undefined));
    }
    catch (error) {
      next(error)
    }
  }

  getTinyUrlDetail = async (req, res, next) => {
    try {
      const data = await this._tiny_url.getTinyUrlDetail(req.body);
      res.send(this._responseTemplate('Success', data, undefined))
    }
    catch (error) {
      next(error)
    }
  }
}




export default tiny_url;
