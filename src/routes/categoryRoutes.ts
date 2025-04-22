import { Router } from "express";
import CategoryController from "../controllers/CategoryController"
import authMiddleware from "../middlewares/authenticateMiddleware";


const router = Router()
const categoryController = new CategoryController()


router.get("/categories", authMiddleware, categoryController.getAll)

router.get("/categories/:id", authMiddleware, categoryController.getOne)

router.delete("/categories/:id", authMiddleware, categoryController.deleteOne)

router.post("/categories/new", authMiddleware, categoryController.createOne)

export default router