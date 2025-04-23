import { Router } from "express"
import { UserController } from "../controllers"


const router = Router()
const userController = new UserController()

router.get("/users", userController.getAll)

router.get("/users/:id", userController.getOne)

router.patch("/users/update/:id", userController.updateOne)

router.delete("/users/delete/:id", userController.deleteOne)

export default router