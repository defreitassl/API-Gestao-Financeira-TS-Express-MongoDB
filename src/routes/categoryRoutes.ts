import { Router } from "express";
import CategoryController from "../controllers/CategoryController"


const router = Router()
const categoryController = new CategoryController()


router.get("/categories", categoryController.getAll)

router.get("/categories/:categoryId", categoryController.getOne)

router.delete("/categories/:categoryId", categoryController.deleteOne)

router.post("/categories/new", categoryController.createOne)

export default router