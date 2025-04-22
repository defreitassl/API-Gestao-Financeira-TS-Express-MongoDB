import CategoryService from "../services/CategoryService"
import { ICategory } from "../models/CategoryModel"
import Controller from "./BaseController"


class CategoryController extends Controller<ICategory> {
    constructor () {
        super(CategoryService)
    }
}


export default CategoryController