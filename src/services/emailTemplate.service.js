import { response } from 'express';
import baseService from './base.service';
import { sequelize } from '../utils/database';
import sendEmail from '../utils/aws/SES/SES'
import createEmailParams from '../utils/aws/SES/emailtemplate'

export class emailTemplateService extends baseService {
    async createEmailTemplate(template) {
        const newtemplate = this._emailTemplate.create({
            templateName: template.templateName,
            subject: template.subject,
            templateContent: template.templateContent,

        })
        return newtemplate
    }

    async isTemplateExist(templateName) {
        let template = await this._emailTemplate.findOne({ where: { templateName: templateName } })

        if (template) {
            return template;
        }
        return undefined;
    }

    async getEmailTemplate(templateId) {

        let template = await this._emailTemplate.findOne(
            {
                where: { id: templateId }
            }
        )

        if (template) {

            return template

        }
        else {

            return undefined;

        }

    }

    async deleteTemplate(templateName) {
        let deleteTemplate = await this._emailTemplate.findOne({ where: { templateName: templateName } })

        if (deleteTemplate) {
            await deleteTemplate.destroy();
            return deleteTemplate
        } else {
            return undefined;
        }
    }

    async sendEmail(email, templateId, options) {
        const template = await this.getEmailTemplate(templateId);
        //console.log(template)
        if (template) {
            const emailParams = await createEmailParams(email, template, options)
            //console.log(emailParams)
            const issend = await sendEmail(emailParams);
            if (issend) {
                return issend
            }     
        } 
    }
}