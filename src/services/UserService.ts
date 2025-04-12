import { Types } from "mongoose"
import { IUser } from "../models/UserModel"
import ServiceResponse from "../types/ServiceResponse"
import toObjectId from "../utils/ToObjectId"
import UserRepository from "../repositories/UserRepository"
import StatusCode from "../utils/StatusCode"
import UpdateResult from "../types/UpdateRequestResult"
import DeleteResult from "../types/DeleteRequestResult"


class UserService {

    getAll = async (): Promise<ServiceResponse<IUser[]>> => {
        const users: IUser[] = await UserRepository.getAll()
        
        return {
            statusCode: StatusCode.OK,
            content: {
                data: users,
                message: "Users retrieved succesfully"
            }
        }
    }

    getOne = async (userIdParam: string): Promise<ServiceResponse<IUser | null>> => {
        const userId: Types.ObjectId = toObjectId(userIdParam)
        const user: IUser | null = await UserRepository.getOne(userId)

        return {
            statusCode: StatusCode.OK,
            content: {
                data: user,
                message: "User retrieved succesfully"
            }
        }
    }

    createOne = async (data: Partial<IUser>): Promise<ServiceResponse<IUser>> => {
        const user: IUser = await UserRepository.createOne(data)

        return {
            statusCode: StatusCode.CREATED,
            content: {
                data: user,
                message: "User created succesfully"
            }
        }
    }

    updateOne = async (userIdParams: string, data: Partial<IUser>): Promise<ServiceResponse<UpdateResult>> => {
        const userId: Types.ObjectId = toObjectId(userIdParams)
        const updatedUserInfo: UpdateResult = await UserRepository.updateOne(userId, data)

        return {
            statusCode: StatusCode.OK,
            content: {
                data: updatedUserInfo,
                message: "User updated succesfully"
            }
        }
    }

    deleteOne = async (userIdParams: string): Promise<ServiceResponse<DeleteResult>> => {
        const userId: Types.ObjectId = toObjectId(userIdParams)
        const deletedUserInfo: DeleteResult = await UserRepository.deleteOne(userId)

        return {
            statusCode: StatusCode.OK,
            content: {
                data: deletedUserInfo,
                message: "User deleted succesfully"
            }
        }
    }
}

export default new UserService()