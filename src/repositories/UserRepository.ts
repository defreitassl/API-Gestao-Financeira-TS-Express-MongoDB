import { Types } from "mongoose"
import User, { IUser } from "../models/UserModel"
import Repository from "./BaseRepository"
import DeleteResult from "../types/DeleteRequestResult"
import UpdateResult from "../types/UpdateRequestResult"


class UserRepository extends Repository<IUser> {
    constructor () {
        super(User)
    }

    getOneByEmail = async (email: string): Promise<IUser | null> => {
        const user: IUser | null = await User
        .findOne({ email: email })
        
        return user
    }

    updateUserBalance = async (newAmount: number, userId: Types.ObjectId): Promise<UpdateResult> => {
        const requestInfo: UpdateResult = await User
        .where("_id").equals(userId)
        .updateOne({ balance: newAmount})

        return requestInfo
    }
}

export default new UserRepository()