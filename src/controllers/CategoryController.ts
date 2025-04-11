import { Request, Response } from "express"
import CategoryService from "../services/CategoryService"


class CategoryController {

    getAll = async ( req: Request, res: Response ): Promise<void> => {
        const response = await CategoryService.getAll()
        res.status(response.statusCode).json(response.content)
    }

    getOne = async ( req: Request, res: Response ): Promise<void> => {
        const response = await CategoryService.getOne(req.params.categoryId)
        res.status(response.statusCode).json(response.content)
    }
    
    createOne = async ( req: Request, res: Response ): Promise<void> => {
        const response = await CategoryService.createOne(req.body)
        res.status(response.statusCode).json(response.content)
    }

    deleteOne = async ( req: Request, res: Response ): Promise<void> => {
        const response = await CategoryService.deleteOne(req.params.categoryId)
        res.status(response.statusCode).json(response.content)
    }
}


export default CategoryController