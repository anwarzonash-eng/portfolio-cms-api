import baseController from "./base.controller"
import { validationMiddleware, authMiddleware } from '../middleware';
import { Env } from "../config";
import { AddPhotoDto, ListPhotosDto } from "../dtos";
import userNotAuthorizaedException from "../exceptions/userNotAuthorizaed.exception";
const uploadPhoto = require("../utils/aws/s3");






class photoController extends baseController {

    constructor() {

        super('/photo')
        this.initializeRouter()
    }

    initializeRouter() {

        this.router.post(`${this.parentRouterPath}/add`, this.addPhoto)
        this.router.post(`${this.parentRouterPath}/list`, validationMiddleware(ListPhotosDto), authMiddleware(), this.listPhoto)

    }



    addPhoto = async (req, res, next) => {

        try {

            if (req.userData)
                new userNotAuthorizaedException()
            //console.log(req.body)
            //const photoDataa = await uploadPhoto.uploadPhoto(req);
            const photoData = await this._photoService.addPhoto(req)
            res.send(this._responseTemplate('Success', photoData, undefined))

        } catch (error) {

            // let obj = new databaseException()
            // next(new NotFoundException('There is a problem'))
            // console.log("photo", error)
            next(error)
        }

    }

    listPhoto = async (req, res, next) => {

        try {

            if (req.userData)
                new userNotAuthorizaedException()

            // console.log(req.body)



            const photosData = await this._photoService.listPhoto(req)
            res.send(this._responseTemplate('Success', photosData, undefined))


        } catch (error) {

            // let obj = new databaseException()
            // next(new NotFoundException('There is a problem'))
            next(error)
        }

    }

}

export default photoController