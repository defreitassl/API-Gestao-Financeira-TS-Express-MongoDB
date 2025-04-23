import { ICategory } from "../models"
import { CategoryRepository } from "../repositories"
import { Service } from "./"


class CategoryService extends Service<ICategory> {
    constructor () {
        super(CategoryRepository, "Category")
    }
}

export default new CategoryService()