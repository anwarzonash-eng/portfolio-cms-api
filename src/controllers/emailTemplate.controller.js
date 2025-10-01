import baseController from "./base.controller"
import { validationMiddleware, authMiddleware } from '../middleware';
import { Env } from "../config";
import { addTemplateDTO, getTemplateDTO, sendMailDTO } from "../dtos";


class emailTemplateController extends baseController {
    constructor() {
        super('/emailtemplate')
        this.initializeRouter()
    }

    initializeRouter() {

        this.router.post(`${this.parentRouterPath}/add`, validationMiddleware(addTemplateDTO), authMiddleware(), this.addTemplate)
        this.router.post(`${this.parentRouterPath}/get`, validationMiddleware(getTemplateDTO), authMiddleware(), this.getTemplate)
        this.router.post(`${this.parentRouterPath}/delete`, validationMiddleware(getTemplateDTO), authMiddleware(), this.deleteTemplate)
        this.router.post(`${this.parentRouterPath}/sendmail`, validationMiddleware(sendMailDTO), authMiddleware(), this.sendEmail)

    }

    sendEmail = async (req, res, next) => {
        try {
            const sendEmail = await this._emailTemplateService.sendEmail(req.body.email, req.body.templateName, req.body.options)
            // console.log(sendEmail)
            if (sendEmail) {
                res.status(sendEmail.code).send(this._responseTemplate(sendEmail.status, sendEmail.issend, sendEmail.msg))
            } else {
                res.status(400).send(this._responseTemplate('Error', undefined, 'Email Not send'))
            }
        } catch (error) {
            next(error)
        }
    }
    deleteTemplate = async (req, res, next) => {
        try {
            const isDelete = await this._emailTemplateService.deleteTemplate(req.body.templateName)
            if (isDelete) {
                res.status(200).send(this._responseTemplate('Success', isDelete, 'Successfully Deleted'))
            } else {
                res.status(400).send(this._responseTemplate('Error', undefined, 'Template Not Exist'))
            }
        } catch (error) {
            next(error)
        }
    }

    getTemplate = async (req, res, next) => {
        try {

            const template = await this._emailTemplateService.getEmailTemplate(req.body.templateName)

            if (template) {

                res.status(200).send(this._responseTemplate('Success', template, undefined))

            } else {

                res.status(400).send(this._responseTemplate('Error', undefined, 'Template Not Exist'))

            }

        } catch (error) {

            next(error)
        }
    }

    addTemplate = async (req, res, next) => {
        try {
            // console.log(req.body)
            const template = await this._emailTemplateService.isTemplateExist(req.body.templateName)
            // console.log(template)
            if (template) {

                res.status(400).send(this._responseTemplate('Error', undefined, 'Template Exists!'))

            }
            const templatedate = await this._emailTemplateService.createEmailTemplate(req.body)
            // console.log(data);
            res.send(this._responseTemplate('Success', templatedate, undefined))


        } catch (error) {
            next(error)
        }

    }

}

export default emailTemplateController