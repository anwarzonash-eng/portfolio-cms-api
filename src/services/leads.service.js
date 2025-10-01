import { response } from 'express';
import baseService from './base.service';
const uploadPhoto = require('../utils/aws/s3');

export class leadService extends baseService {
  async addLeads(req) {
    const { name, email, message, source_category, ...extraFields } = req.body;

    const contentObject = extraFields;
    const domain = req.headers.referer;

    let source = domain?.replace(/(^\w+:|^)\/\/(www\.)?|\/$/g, '');

    let upload = '';

    if (req.files && req.files.upload) {
      upload = await uploadPhoto.uploadRequest(req.files.upload);
      contentObject.upload = upload;
    }

    console.log({ body: req.body, files: req.files, upload });

    const newLead = await this._leadModel.create({
      name,
      email,
      message,
      source_category: `${source_category}@${source}`,
      source,
      content: contentObject,
    });

    console.log('newLead', newLead);

    return newLead;
  }

  async listLeads(req) {
    const leadsList = await this._leadModel.findAll({
      where: {
        is_deleted: false,
      },
    });
    return leadsList;
  }

  async updateStatus(req) {
    try {
      let leadData = await this._leadModel.update(
        { status: req.status },
        { returning: true, where: { id: req.id } }
      );

      if (leadData != undefined) {
        var updatedStatus = leadData[1][0].get();
        return updatedStatus;
      } else {
        return undefined;
      }
    } catch (error) {
      // console.log(error);
    }
  }

  async deleteLead(req) {
    try {
      let leadData = await this._leadModel.update(
        { is_deleted: true },
        {
          where: { id: req.id },
          returning: true,
        }
      );
      return leadData;
    } catch (error) {
      // console.log(error);
    }
  }
}
