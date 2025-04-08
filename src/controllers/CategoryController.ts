import { Request, Response } from "express"
import Category from "../models/CategoryModel"


class CategoryController {

    getAll = async (req: Request, res: Response): Promise<void> => {
        const categories = await Category.find()
        res.status(200).json({ data: categories })
    }
    
    createOne = async (req: Request, res: Response): Promise<void> => {
        const category = req.body
        await Category.create(category)
        res.status(201).json({ message: category })
    }
}


export default CategoryController