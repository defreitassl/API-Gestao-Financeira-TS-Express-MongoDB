import { Types } from "mongoose"
import { User, IUser, ITransaction } from "../models"
import { Repository } from "./"
import { DeleteResult, UpdateResult } from "../types"


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