import { ICategory } from "../models/CategoryModel"
import CategoryRepository from "../repositories/CategoryRepository"
import Service from "./BaseService"


class CategoryService extends Service<ICategory> {
    constructor () {
        super(CategoryRepository, "Category")
    }
}

export default new CategoryService()