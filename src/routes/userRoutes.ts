import { Router } from "express"
import { UserController } from "../controllers"
import { authMiddleware } from "../middlewares"


const router = Router()
const userController = new UserController()

// Rota Apenas para testes
router.get("/users", userController.getAll)

router.patch("/users/update", authMiddleware, userController.updateOneUser)

router.delete("/users/delete", authMiddleware, userController.deleteOneUser)

export default router