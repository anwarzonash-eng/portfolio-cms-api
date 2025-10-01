import baseController from "./base.controller"
import { validationMiddleware, authMiddleware } from '../middleware';
import { Env } from "../config";
import { reportsDto, listPortfolioDto, portfolioByIdDto } from "../dtos";
import userNotAuthorizaedException from "../exceptions/userNotAuthorizaed.exception";
const uploadPhoto = require("../utils/aws/s3");







class reportsController extends baseController {

    constructor() {

        super('/reports')
        this.initializeRouter()
    }

    initializeRouter() {

        this.router.post(`${this.parentRouterPath}/`, validationMiddleware(reportsDto), this.list)
        this.router.post(`${this.parentRouterPath}/listPortfolios`, validationMiddleware(listPortfolioDto), this.listPortfolios)
        this.router.post(`${this.parentRouterPath}/getPortfolioById`, validationMiddleware(portfolioByIdDto), this.getPortfolioById)

    }

    list = async (req, res, next) => {

        try {
            const reportData = await this._reportService.list(req)
            res.send(this._responseTemplate('Success', reportData, undefined))

        } catch (error) {

            next(error)
        }

    }

    listPortfolios = async (req, res, next) => {
        try {
            const reportData = await this._reportService.listPortfolios(req)
            res.send(this._responseTemplate('Success', reportData, undefined))
        }
        catch (error) {
            next(error)
        }

    }

    getPortfolioById = async (req, res, next) => {
        try {
            const reportData = await this._reportService.getPortfolioById(req)
            res.send(this._responseTemplate('Success', reportData, undefined))

        } catch (error) {
            next(error)
        }

    }

    listSkills = async (req, res, next) => {

        try {

            if (req.userData)
                new userNotAuthorizaedException()

            console.log(req.body)



            const skillsData = await this._skillService.listSkills()
            res.send(this._responseTemplate('Success', skillsData, undefined))


        } catch (error) {

            // let obj = new databaseException()
            // next(new NotFoundException('There is a problem'))
            next(error)
        }

    }
    

}

export default reportsController