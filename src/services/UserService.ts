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
        try {
            const users: IUser[] = await UserRepository.getAll()

            if (users.length === 0) {
                return {
                    statusCode: StatusCode.NO_CONTENT,
                    content: {
                        data: users,
                        message: "No users found"
                    }
                }
            }
            
            return {
                statusCode: StatusCode.OK,
                content: {
                    data: users,
                    message: "Users retrieved succesfully"
                }
            }
        } catch (error) {
            return {
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
                content: {
                    message: "Error retrieving users",
                    error: String(error)
                }
            }
        }
    }

    getOne = async (userIdParam: string): Promise<ServiceResponse<IUser | null>> => {
        try {
            const userId: Types.ObjectId = toObjectId(userIdParam)
            const user: IUser | null = await UserRepository.getOne(userId)

            if (!user) {
                return {
                    statusCode: StatusCode.NOT_FOUND,
                    content: {
                        message: "User not found",
                        error: "Not Found Error"
                    }
                }
            }

            return {
                statusCode: StatusCode.OK,
                content: {
                    data: user,
                    message: "User retrieved succesfully"
                }
            }
        } catch (error) {
            return {
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
                content: {
                    message: "Error retrieving users",
                    error: String(error)
                }
            }
        }
    }

    createOne = async (data: Partial<IUser>): Promise<ServiceResponse<IUser>> => {
        try {
            const user: IUser = await UserRepository.createOne(data)

            return {
                statusCode: StatusCode.CREATED,
                content: {
                    data: user,
                    message: "User created succesfully"
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                return {
                    statusCode: StatusCode.CONFLICT,
                    content: {
                        message: "User email already exists",
                        error: error.message
                    }
                }
            }
            return {
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
                content: {
                    message: "Error creating user",
                    error: String(error)
                }
            }
        }
        
    }

    updateOne = async (userIdParams: string, data: Partial<IUser>): Promise<ServiceResponse<UpdateResult>> => {
        try {
            const userId: Types.ObjectId = toObjectId(userIdParams)
            const updatedUserInfo: UpdateResult = await UserRepository.updateOne(userId, data)

            if (!updatedUserInfo || updatedUserInfo.matchedCount === 0) {
                return {
                    statusCode: StatusCode.NOT_FOUND,
                    content: {
                        message: "User not found",
                        error: "Not Found Error"
                    }
                }
            }
            return {
                statusCode: StatusCode.OK,
                content: {
                    data: updatedUserInfo,
                    message: "User updated successfully"
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                return {
                    statusCode: StatusCode.BAD_REQUEST,
                    content: {
                        message: error.message,
                        error: error.name
                    }
                }
            }
            return {
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
                content: {
                    error: String(error),
                    message: "Error updating User",
                }
            }
        }
    }

    deleteOne = async (userIdParams: string): Promise<ServiceResponse<DeleteResult>> => {
        try {
            const userId: Types.ObjectId = toObjectId(userIdParams)
            const deletedUserInfo: DeleteResult = await UserRepository.deleteOne(userId)

            if (deletedUserInfo.deletedCount === 0) {
                return {
                    statusCode: StatusCode.NOT_FOUND,
                    content: {
                        message: "User not found",
                        error: "Not Found Error"
                    }
                }
            }
            return {
                statusCode: StatusCode.OK,
                content: {
                    data: deletedUserInfo,
                    message: "User deleted succesfully"
                }
            }   
        } catch (error) {
            return {
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
                content: {
                    message: "Error deleting User",
                    error: String(error)
                }
            }
        }
    }
}

export default new UserService()