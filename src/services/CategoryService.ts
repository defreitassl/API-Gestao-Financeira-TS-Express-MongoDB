import { Types } from "mongoose"
import { ICategory } from "../models/CategoryModel"
import CategoryRepository from "../repositories/CategoryRepository"
import ServiceResponse from "../types/ServiceResponse"
import toObjectId from "../utils/ToObjectId"
import StatusCode from "../utils/StatusCode"
import DeleteResult from "../types/DeleteRequestResult"


class CategoryService {

    getAll = async (): Promise<ServiceResponse<ICategory[]>> => {
        try {
            const categories: ICategory[] = await CategoryRepository.getAll()

            if (categories.length === 0) {
                return {
                    statusCode: StatusCode.NO_CONTENT,
                    content: {
                        data: categories,
                        message: "No categories found"
                    }
                }
            }

            return {
                statusCode: StatusCode.OK,
                content: {
                    data: categories,
                    message: "Categories retrieved successfully"
                }
            }
        } catch (error) {
            return {
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
                content: {
                    message: "Error retrieving categories",
                    error: error
                }
            }
        }
    }

    getOne = async (categoryIdParam: string): Promise<ServiceResponse<ICategory>> => {
        try {
            const categoryId: Types.ObjectId = toObjectId(categoryIdParam)
            const category: ICategory | null = await CategoryRepository.getOne(categoryId)

            if (!category) {
                return {
                    statusCode: StatusCode.NOT_FOUND,
                    content: {
                        message: "Category not found",
                        error: "Not Found Error"
                    }
                }
            }

            return {
                statusCode: StatusCode.OK,
                content: {
                    data: category,
                    message: "Category retrieved successfully"
                }
            }
        } catch (error) {
            return {
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
                content: {
                    message: "Error retrieving category",
                    error: error
                }
            }
        }
    }

    createOne = async (data: ICategory): Promise<ServiceResponse<ICategory>> => {
        try {
            const category: ICategory = await CategoryRepository.createOne(data)

            return {
                statusCode: StatusCode.CREATED,
                content: {
                    data: category,
                    message: "Category created successfully"
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                return {
                    statusCode: StatusCode.CONFLICT,
                    content: {
                        message: "Category name or color already exists",
                        error: error.message
                    }
                }
            }
            return {
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
                content: {
                    message: "Error creating category",
                    error: error
                }
            }
        }
    }

    deleteOne = async (categoryIdParam: string): Promise<ServiceResponse<DeleteResult>> => {
        try {
            const categoryId: Types.ObjectId = toObjectId(categoryIdParam)
            const deletedCategoryInfo: DeleteResult = await CategoryRepository.deleteOne(categoryId)

            if (deletedCategoryInfo.deletedCount === 0) {
                return {
                    statusCode: StatusCode.NOT_FOUND,
                    content: {
                        message: "Category not found",
                        error: "Not Found Error"
                    }
                }
            }
            return {
                statusCode: StatusCode.OK,
                content: {
                    data: deletedCategoryInfo,
                    message: "Category deleted successfully"
                }
            }
        } catch (error) {
            return {
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
                content: {
                    message: "Error deleting category",
                    error: error
                }
            }
        }
    }
}

export default new CategoryService()