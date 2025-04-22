import { NextFunction, Request, Response } from "express"
import AuthService from "../services/AuthService"


class AuthController {
    
    register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const response = await AuthService.register(req.body)
            res.status(response.statusCode).json(response.content)
        } catch (error) {
            next(error)
        }
    }

    login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const response = await AuthService.login()
            res.status(response.statusCode).json(response.content)
        } catch (error) {
            next(error)
        }
    }

    logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const response = await AuthService.logout()
            res.status(response.statusCode).json(response.content)
        } catch (error) {
            next(error)
        }
    }

    me = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const response = await AuthService.me()
            res.status(response.statusCode).json(response.content)
        } catch (error) {
            next(error)
        }
    }
}

export default AuthController