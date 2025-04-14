import { IUser } from "../models/UserModel"
import UserRepository from "../repositories/UserRepository"
import Service from "./BaseService"


class UserService extends Service<IUser> {
    constructor () {
        super(UserRepository, "User")
    }
}

export default new UserService()