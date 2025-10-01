import baseService from './base.service';
import { checkRecord } from '../utils/checkRecord';
import { deletePhotoWhileUpdate } from '../utils/deletePhotoWhileUpdate';

const uploadPhoto = require('../utils/aws/s3');

export class videoService extends baseService {
  async syncVideo(req) {
    let response;

    let video = '';

    if (req.body.actionType === 'add') {
      video = await uploadPhoto.uploadRequest(req.files.video);
    }

    if (req.body.actionType === 'add') {
      response = await this._videoModel.create({
        title: req.body.title,
        private_title: req.body.private_title,
        main_profile_id: req.body.main_profile_id,
        video: video,
      });
    } else if (req.body.actionType === 'update') {
      const existingVideo = await this._videoModel.findOne({
        where: { id: req.body.id },
      });

      // Ensure existing video is found
      if (!existingVideo) {
        throw new Error('Video record not found.');
      }
      let bodyPayload = {
        title: req.body.title,
        private_title: req.body.private_title,
        main_profile_id: req.body.main_profile_id,
      };
      if (!req.body.video) {
        video = await deletePhotoWhileUpdate({
          fileData: req.files,
          fileInFileData: req.files.video,
          existingFile: existingVideo.video,
        });
        bodyPayload.video = video;
      }

      const [rowsUpdated, updatedUser] = await this._videoModel.update(
        bodyPayload,

        {
          where: { id: req.body.id },
          returning: true,
        }
      );

      response = updatedUser;
    } else if (req.body.actionType === 'delete') {
      const videoIdToDelete = req.body.id;
      const detailProfilePresent = await checkRecord(
        this._detailProfileModel,
        videoIdToDelete,
        'video_attached'
      );

      if (detailProfilePresent) {
        throw new Error(
          'Cannot delete the video as it is present in detail profile.'
        );
      }

      const [rowsUpdated, updatedUser] = await this._videoModel.update(
        { is_deleted: true },
        {
          where: { id: videoIdToDelete },
          returning: true,
        }
      );
      // console.log(rowsUpdated, updatedUser);
      response = updatedUser;
    }

    return response;
  }

  async list() {
    const results = await this._videoModel.findAll({
      where: { is_deleted: false },
    });

    return results;
  }
}
