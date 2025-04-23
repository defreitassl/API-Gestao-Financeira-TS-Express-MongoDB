import Router from 'express'
import { AuthController } from '../controllers'
import { authMiddleware } from '../middlewares'


const router = Router()
const authController = new AuthController()

router.post("/auth/register", authController.register)

router.post("/auth/login", authController.login)

router.get("/auth/me", authMiddleware, authController.me)

export default router