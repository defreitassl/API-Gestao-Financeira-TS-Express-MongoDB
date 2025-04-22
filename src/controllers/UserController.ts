import UserService from '../services/UserService'
import Controller from './BaseController'
import { IUser } from '../models/UserModel'
import { Request, Response,NextFunction } from 'express'


class UserController extends Controller<IUser> {
    constructor () {
        super(UserService)
    }

    updateOneUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const response = await UserService.updateOneUser(req.params.id, req.body)
            res.status(response.statusCode).json(response.content)
        } catch (error) {
            next(error)
        }
    }
}

export default UserController