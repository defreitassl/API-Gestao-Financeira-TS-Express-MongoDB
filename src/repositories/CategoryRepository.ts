import { Category, ICategory } from "../models"
import { Repository } from "./"


class CategoryRepository extends Repository<ICategory> {
    constructor () {
        super(Category)
    }
}

export default new CategoryRepository()