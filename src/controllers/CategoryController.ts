import { ICategory } from "../models"
import { CategoryService } from "../services"
import { Controller } from "./"


class CategoryController extends Controller<ICategory> {
    constructor () {
        super(CategoryService)
    }
}


export default CategoryController