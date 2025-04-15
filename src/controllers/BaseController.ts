import { NextFunction } from "express"
import { Request, Response } from 'express'
import Service from "../services/BaseService"


abstract class Controller<T> {
    protected service: Service<T>

    constructor (service: Service<T>) {
        this.service = service
    }

    getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const response = await this.service.getAll()
            res.status(response.statusCode).json(response.content)
        } catch (error) {
            next(error)
        }
    }

    getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const response = await this.service.getOne(req.params.id)
            res.status(response.statusCode).json(response.content)
        } catch (error) {
            next(error)
        }
    }

    createOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const response = await this.service.createOne(req.body)
            res.status(response.statusCode).json(response.content)
        } catch (error) {
            next(error)
        }
    }

    deleteOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const response = await this.service.deleteOne(req.params.id)
            res.status(response.statusCode).json(response.content)
        } catch (error) {
            next(error)
        }
    }

    updateOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const response = await this.service.updateOne(req.params.id, req.body)
            res.status(response.statusCode).json(response.content)
        } catch (error) {
            next(error)
        }
    }
}

export default Controller