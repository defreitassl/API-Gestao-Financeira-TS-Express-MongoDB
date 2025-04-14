import { Types } from "mongoose"
import User, { IUser } from "../models/UserModel"
import Repository from "./BaseRepository"
import DeleteResult from "../types/DeleteRequestResult"
import UpdateResult from "../types/UpdateRequestResult"


class UserRepository extends Repository<IUser> {
    constructor () {
        super(User)
    }

    //Adicionar novas funções específicas aqui
}

export default new UserRepository()