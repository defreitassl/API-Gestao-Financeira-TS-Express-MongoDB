import { Request, Response } from 'express'
import User from '../models/UserModel'
import UserService from '../services/UserService'


class UserController {

    getAll = async (req: Request, res: Response): Promise<void> => {
        const response = await UserService.getAll()
        res.status(response.statusCode).json(response.content)
    }

    getOne = async (req: Request, res: Response): Promise<void> => {
        const response = await UserService.getOne(req.params.userId)
        res.status(response.statusCode).json(response.content)
    }

    createOne = async (req: Request, res: Response): Promise<void> => {
        const response = await UserService.createOne(req.body)
        res.status(response.statusCode).json(response.content)
    }

    deleteOne = async (req: Request, res: Response): Promise<void> => {
        const response = await UserService.deleteOne(req.params.userId)
        res.status(response.statusCode).json(response.content)
    }

    updateOne = async (req: Request, res: Response): Promise<void> => {
        const response = await UserService.updateOne(req.params.userId, req.body)
        res.status(response.statusCode).json(response.content)
    }

}

export default UserController