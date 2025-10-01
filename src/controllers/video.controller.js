import baseController from './base.controller';
import { validationMiddleware } from '../middleware';
import { VideoDto } from '../dtos';

class videoController extends baseController {
  constructor() {
    super('/video');
    this.initializeRouter();
  }

  initializeRouter() {
    this.router.post(
      `${this.parentRouterPath}/sync`,
      validationMiddleware(VideoDto),
      this.syncVideo
    );
  }

  syncVideo = async (req, res, next) => {
    try {
      if (req.body.actionType == 'list') {
        const data = await this._videoService.list();
        res.send(this._responseTemplate('Success', data, undefined));
      } else {
        let data = await this._videoService.syncVideo(req);
        data = await this._videoService.list();
        res.send(this._responseTemplate('Success', data, undefined));
      }
    } catch (error) {
      next(error);
    }
  };
}

export default videoController;
