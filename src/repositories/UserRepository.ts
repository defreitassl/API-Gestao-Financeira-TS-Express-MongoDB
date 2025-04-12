import { Types } from "mongoose"
import User, { IUser } from "../models/UserModel"
import DeleteResult from "../types/DeleteRequestResult"
import UpdateResult from "../types/UpdateRequestResult"


class UserRepository {
    getAll = async (): Promise<IUser[]> => {
        const users: IUser[] = await User.find()
        return users
    }

    getOne = async (userId: Types.ObjectId): Promise<IUser | null> => {
        const user: IUser | null = await User
        .where("_id").equals(userId)
        .findOne()
        return user
    }

    createOne = async (data: Partial<IUser>): Promise<IUser> => {
        const user: IUser = await User.create(data)
        return user
    }

    deleteOne = async (userId: Types.ObjectId): Promise<DeleteResult> => {
        const result: DeleteResult = await User
        .where("_id").equals(userId)
        .deleteOne()
        return result
    }

    updateOne = async (userId: Types.ObjectId, data: Partial<IUser>): Promise<UpdateResult> => {
        const result: UpdateResult = await User
        .where("_id").equals(userId)
        .updateOne(data)
        return result
    }
}

export default new UserRepository()