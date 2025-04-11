import { Types } from "mongoose"
import Category, { ICategory } from "../models/CategoryModel"
import DeleteResult from "../types/DeleteRequestResult"


class CategoryRepository {

    getAll = async (): Promise<ICategory[]> => {
        const categories: ICategory[] = await Category.find()
        return categories
    }

    getOne = async (categoryId: Types.ObjectId): Promise<ICategory | null> => {
        const category: ICategory | null = await Category.findById({ _id: categoryId })
        return category
    }

    createOne = async (data: ICategory): Promise<ICategory> => {
        const newCategory: ICategory = await Category.create(data)
        return newCategory
    }

    deleteOne = async (categoryId: Types.ObjectId): Promise<DeleteResult> => {
        const requestInfo: DeleteResult = await Category
        .where("_id").equals(categoryId)
        .deleteOne()
        return requestInfo
    }
}

export default new CategoryRepository()