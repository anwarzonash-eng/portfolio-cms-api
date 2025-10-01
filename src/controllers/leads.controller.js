import baseController from "./base.controller"
import { validationMiddleware, authMiddleware } from '../middleware';
import { Env } from "../config";
import { AddLeadsDto, updateLeadsStatusDto, deleteLeadDto } from "../dtos";
import userNotAuthorizaedException from "../exceptions/userNotAuthorizaed.exception";






class leadsController extends baseController {

    constructor() {

        super('/leads')
        this.initializeRouter()
    }

    initializeRouter() {

        this.router.post(`${this.parentRouterPath}/add`, validationMiddleware(AddLeadsDto),  this.addLead)
        this.router.post(`${this.parentRouterPath}/list`, this.listLeads)
        this.router.post(`${this.parentRouterPath}/updateStatus`, validationMiddleware(updateLeadsStatusDto), this.updateStatus)
        this.router.post(`${this.parentRouterPath}/deleteLead`, validationMiddleware(deleteLeadDto), this.deleteLead)


    }

    addLead = async (req, res, next) => {

        try {

          
            const leadsData = await this._leadService.addLeads(req)
            res.send(this._responseTemplate('Success', leadsData, undefined))

        } catch (error) {

            // let obj = new databaseException()
            // next(new NotFoundException('There is a problem'))
            next(error)
        }

    }



    listLeads = async (req, res, next) => {

        try {

            
            if (req.userData)
                new userNotAuthorizaedException()

            const leadsData = await this._leadService.listLeads(req)
            res.send(this._responseTemplate('Success', leadsData, undefined))


        } catch (error) {

            // let obj = new databaseException()
            // next(new NotFoundException('There is a problem'))
            next(error)
        }

    }

    updateStatus = async (req, res, next) => {
        try {         
            if (req.userData)
                new userNotAuthorizaedException()

            const leadsData = await this._leadService.updateStatus(req.body)
            res.send(this._responseTemplate('Success', leadsData, undefined))


        } catch (error) {
            next(error)
        }

    }

    deleteLead = async (req, res, next) => {
        try {         
            if (req.userData)
                new userNotAuthorizaedException()

            const leadsData = await this._leadService.deleteLead(req.body)
            res.send(this._responseTemplate('Success', leadsData, undefined))


        } catch (error) {
            next(error)
        }

    }

}

export default leadsController