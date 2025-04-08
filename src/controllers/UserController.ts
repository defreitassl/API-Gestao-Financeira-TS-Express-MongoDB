import { Request, Response } from 'express'
import User from '../models/UserModel'


class UserController {

    getAll = async (req: Request, res: Response): Promise<void> => {
        const users = await User.find()
        res.status(200).json(users)
    }

    createOne = async (req: Request, res: Response): Promise<void> => {

        const user = req.body
        await User.create(user)
        res.status(201).json({ response: "OK", data: user })
    }
}

export default UserController