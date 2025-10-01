import { response } from 'express';
import baseService from './base.service';
import { sequelize } from '../utils/database';
import { deletePhotoWhileUpdate } from '../utils/deletePhotoWhileUpdate';

const uploadPhoto = require('../utils/aws/s3');

export class mainProfileService extends baseService {
  async sync(req) {
    let response;

    let profile_photo_1 = '';
    let profile_photo_2 = '';
    let profile_photo_3 = '';
    // let video = '';

    // || req.body.actionType === 'update')

    if (req.body.actionType === 'add') {
      {
        req.files &&
          req.files.profile_photo_1 &&
          req.files.profile_photo_1 !== 'null' &&
          (profile_photo_1 = await uploadPhoto.uploadRequest(
            req.files.profile_photo_1
          ));
      }
      {
        req.files &&
          req.files.profile_photo_2 &&
          req.files.profile_photo_2 !== 'null' &&
          (profile_photo_2 = await uploadPhoto.uploadRequest(
            req.files.profile_photo_2
          ));
      }
      {
        req.files &&
          req.files.profile_photo_3 &&
          req.files.profile_photo_3 !== 'null' &&
          (profile_photo_3 = await uploadPhoto.uploadRequest(
            req.files.profile_photo_3
          ));
      }

      // {
      //   req.files &&
      //     req.files.video &&
      //     req.files.video !== 'null' &&
      //     (video = await uploadPhoto.uploadRequest(req.files.video));
      // }
    }

    if (req.body.actionType === 'add') {
      response = await this._mainProfileModel.create({
        domain: req.body.domain,
        name: req.body.name,
        home_page_tagline: req.body.homePageTagline,
        profile_photo_1: profile_photo_1 || null,
        profile_photo_2: profile_photo_2 || null,
        profile_photo_3: profile_photo_3 || null,
        email: req.body.email,
        // video: video || null,
        linkedIn: req.body.linkedIn,
        facebook: req.body.facebook,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
        upwork: req.body.upwork,
        github: req.body.github,
        no_of_experiences: req.body.no_of_experiences,
        projects_completed: req.body.projects_completed,
        phone_no: req.body.phone_no,
        location: req.body.location,
        hourly_rate: req.body.hourly_rate,
        behance_link: req.body.behance_link,
        calendly_link: req.body.calendly_link,
        color1: req.body.color1,
        color2: req.body.color2,
        color3: req.body.color3,
        color4: req.body.color4,

        primary_color: req.body.primary_color,
        page_bg_color: req.body.page_bg_color,
        banner_bg_color: req.body.banner_bg_color,
        section_bg_color: req.body.section_bg_color,
        heading_color: req.body.heading_color,
        paragrapgh1_color: req.body.paragrapgh1_color,
        paragrapgh2_color: req.body.paragrapgh2_color,
        border_color: req.body.border_color,

        googleAnalyticsScript: req.body.googleAnalyticsScript,
        companytype: req.body.companytype,
      });
      // console.log('working');
    } else if (req.body.actionType === 'update') {
      const existingProfile = await this._mainProfileModel.findOne({
        where: { id: req.body.id },
      });

      if (!existingProfile) {
        throw new Error('Profile not found');
      }
      let bodyPayload = {
        domain: req.body.domain,
        name: req.body.name,
        home_page_tagline: req.body.homePageTagline,
        behance_link: req.body.behance_link,
        email: req.body.email,
        linkedIn: req.body.linkedIn,
        facebook: req.body.facebook,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
        upwork: req.body.upwork,
        github: req.body.github,
        phone_no: req.body.phone_no,
        location: req.body.location,
        hourly_rate: req.body.hourly_rate,
        calendly_link: req.body.calendly_link,
        color1: req.body.color1,
        color2: req.body.color2,
        color3: req.body.color3,
        color4: req.body.color4,
        no_of_experiences: req.body.no_of_experiences,
        projects_completed: req.body.projects_completed,
        primary_color: req.body.primary_color,
        page_bg_color: req.body.page_bg_color,
        banner_bg_color: req.body.banner_bg_color,
        section_bg_color: req.body.section_bg_color,
        heading_color: req.body.heading_color,
        paragrapgh1_color: req.body.paragrapgh1_color,
        paragrapgh2_color: req.body.paragrapgh2_color,
        border_color: req.body.border_color,
        googleAnalyticsScript: req.body.googleAnalyticsScript,
        companytype: req.body.companytype,
      };
      if (!req.body.profile_photo_1) {
        profile_photo_1 = await deletePhotoWhileUpdate({
          fileData: req.files,
          fileInFileData: req.files.profile_photo_1,
          existingFile: existingProfile.profile_photo_1,
        });
        bodyPayload.profile_photo_1 = profile_photo_1;
      }
      if (!req.body.profile_photo_2) {
        profile_photo_2 = await deletePhotoWhileUpdate({
          fileData: req.files,
          fileInFileData: req.files.profile_photo_2,
          existingFile: existingProfile.profile_photo_2,
        });
        bodyPayload.profile_photo_2 = profile_photo_2;
      }
      if (!req.body.profile_photo_3) {
        profile_photo_3 = await deletePhotoWhileUpdate({
          fileData: req.files,
          fileInFileData: req.files.profile_photo_3,
          existingFile: existingProfile.profile_photo_3,
        });
        bodyPayload.profile_photo_3 = profile_photo_3;
      }

      // if (!req.body.video) {
      //   video = await uploadPhoto.uploadRequest(req.files.video);
      //   bodyPayload.video = video;
      // }

      const [rowsUpdated, updatedUser] = await this._mainProfileModel.update(
        bodyPayload,
        {
          where: { id: req.body.id },
          returning: true,
        }
      );
      // console.log(rowsUpdated, updatedUser);

      response = updatedUser;
    } else if (req.body.actionType === 'delete') {
      const associations = [
        await this._experienceModel.count({
          where: { main_profile_id: req.body.id },
        }),
        await this._portfolioModel.count({
          where: { main_profile_id: req.body.id },
        }),
        await this._educationModel.count({
          where: { main_profile_id: req.body.id },
        }),
      ];

      if (associations.some((count) => count > 0)) {
        const errorMessage =
          'Main profile is associated with other records and cannot be deleted.';
        throw new Error(errorMessage);
      }

      const [rowsUpdated, updatedUser] = await this._mainProfileModel.update(
        { is_deleted: true },
        {
          where: { id: req.body.id },
          returning: true,
        }
      );

      return updatedUser;
    }

    return response;
  }

  async singlePHoto(req) {
    // console.log(req.files);

    let photoURL1 = await uploadPhoto.uploadRequestMultiple(
      req.files.profilePic1
    );

    return photoURL1;
  }

  async list() {
    const results = await this._mainProfileModel.findAll({
      where: {
        is_deleted: false,
      },
      order: [['domain', 'ASC']],
    });

    return results;
  }
}
