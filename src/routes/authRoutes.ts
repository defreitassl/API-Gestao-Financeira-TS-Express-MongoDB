import Router from 'express'
import AuthController from '../controllers/AuthController'

const router = Router()
const authController = new AuthController()

router.post("/auth/register", authController.register)

router.post("/auth/login", authController.login)

router.post("/auth/logout", authController.logout)

router.get("/auth/me", authController.me)

export default router