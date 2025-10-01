import baseController from "./base.controller"
import { validationMiddleware, authMiddleware } from '../middleware';
import { Env } from "../config";
import { EducationDto } from "../dtos";
import userNotAuthorizaedException from "../exceptions/userNotAuthorizaed.exception";
const uploadPhoto = require("../utils/aws/s3");







class educationController extends baseController {

    constructor() {

        super('/education')
        this.initializeRouter()
    }

    initializeRouter() {

        this.router.post(`${this.parentRouterPath}/sync`, validationMiddleware(EducationDto), this.syncEducation)


    }

    syncEducation = async (req, res, next) => {

        try {

            if (req.body.actionType == 'list') {

                const educationData = await this._educationService.list()
                res.send(this._responseTemplate('Success', educationData, undefined))

            }
            else {

                let educationData = await this._educationService.syncEducation(req)
                educationData = await this._educationService.list()
                res.send(this._responseTemplate('Success', educationData, undefined))
            }

        } catch (error) {

            next(error)
        }

    }

    // listSkills = async (req, res, next) => {

    //     try {

    //         if (req.userData)
    //             new userNotAuthorizaedException()

    //         console.log(req.body)



    //         const skillsData = await this._skillService.listSkills()
    //         res.send(this._responseTemplate('Success', skillsData, undefined))


    //     } catch (error) {

    //         // let obj = new databaseException()
    //         // next(new NotFoundException('There is a problem'))
    //         next(error)
    //     }

    // }

}

export default educationController