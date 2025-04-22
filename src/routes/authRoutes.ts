import Router from 'express'
import AuthController from '../controllers/AuthController'
import authMiddleware from '../middlewares/authenticateMiddleware'


const router = Router()
const authController = new AuthController()

router.post("/auth/register", authController.register)

router.post("/auth/login", authController.login)

router.get("/auth/me", authMiddleware, authController.me)

export default router