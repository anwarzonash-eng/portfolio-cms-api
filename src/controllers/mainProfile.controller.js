import baseController from "./base.controller"
import { validationMiddleware, authMiddleware } from '../middleware';
import { Env } from "../config";
import { mainProfileDto } from "../dtos";
import userNotAuthorizaedException from "../exceptions/userNotAuthorizaed.exception";
const uploadPhoto = require("../utils/aws/s3");







class mainProfileController extends baseController {

    constructor() {

        super('/main_profile')

        this.initializeRouter()
    }


    initializeRouter() {

        this.router.post(`${this.parentRouterPath}/sync`,
            validationMiddleware(mainProfileDto),
            this.sync)

        this.router.post(`${this.parentRouterPath}/single`,
            this.singlePhoto)

    }


    singlePhoto = async (req, res, next) => {

        try {

            // console.log('api calleds');
            let skillsData = await this._mainProfileService.singlePHoto(req)
            res.send(this._responseTemplate('Success', skillsData, undefined))

        } catch (error) {

            next(error)
        }

    }

    sync = async (req, res, next) => {

        try {



            if (req.body.actionType == 'list') {

                const skillsData = await this._mainProfileService.list()
                res.send(this._responseTemplate('Success', skillsData, undefined))

            }
            else {

                let skillsData = await this._mainProfileService.sync(req)

                skillsData = await this._mainProfileService.list()
                res.send(this._responseTemplate('Success', skillsData, undefined))
            }

        } catch (error) {

            next(error)
        }

    }

    listSkills = async (req, res, next) => {

        try {

            if (req.userData)
                new userNotAuthorizaedException()

            // console.log(req.body)



            const skillsData = await this._skillService.listSkills()
            res.send(this._responseTemplate('Success', skillsData, undefined))


        } catch (error) {

            // let obj = new databaseException()
            // next(new NotFoundException('There is a problem'))
            next(error)
        }

    }

}

export default mainProfileController