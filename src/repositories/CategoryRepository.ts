import Category, { ICategory } from "../models/CategoryModel"
import Repository from "./BaseRepository"


class CategoryRepository extends Repository<ICategory> {

    constructor () {
        super(Category)
    }
}

export default new CategoryRepository()