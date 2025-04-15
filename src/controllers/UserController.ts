import UserService from '../services/UserService'
import Controller from './BaseController'
import { IUser } from '../models/UserModel'


class UserController extends Controller<IUser> {
    constructor () {
        super(UserService)
    }
}

export default UserController