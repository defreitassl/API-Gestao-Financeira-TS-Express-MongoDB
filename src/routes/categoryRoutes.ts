import { Router } from "express";
import CategoryController from "../controllers/CategoryController"


const router = Router()
const categoryController = new CategoryController()


router.get("/categories", categoryController.getAll)

router.get("/categories/:id", categoryController.getOne)

router.delete("/categories/:id", categoryController.deleteOne)

router.post("/categories/new", categoryController.createOne)

export default router