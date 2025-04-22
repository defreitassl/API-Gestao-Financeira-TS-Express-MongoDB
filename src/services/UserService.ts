import { Types } from "mongoose"
import { BadRequestError, ConflictError, NotFoundError, UnprocessableEntityError } from "../errors"
import { IUser } from "../models/UserModel"
import UserRepository from "../repositories/UserRepository"
import ServiceResponse from "../types/ServiceResponse"
import UpdateResult from "../types/UpdateRequestResult"
import StatusCode from "../types/StatusCode"
import Service from "./BaseService"
import toObjectId from "../utils/toObjectId"


class UserService extends Service<IUser> {
    constructor () {
        super(UserRepository, "User")
    }

    createOneUser = async (data: Partial<IUser>): Promise<ServiceResponse<IUser>> => {
        try {
            if (!data || Object.keys(data).length === 0) throw new BadRequestError(`Missing User data`)
            if (!data.name || !data.email || !data.password) throw new UnprocessableEntityError("Missing User required fields (name, email or password)")
            
            const existingEmail = await UserRepository.getOneByEmail(data.email)

            if (existingEmail) throw new ConflictError("User Email already exists")

            const user = await UserRepository.createOne(data)

            return {
                statusCode: StatusCode.CREATED,
                content: {
                    data: user,
                    message: `User created successfully`
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                throw error
            }
            throw new Error()
        }
    }

    updateOneUser = async (idParam: string, data: Partial<IUser>): Promise<ServiceResponse<UpdateResult>> => {
        try {
            if (!data || Object.keys(data).length === 0) throw new BadRequestError(`Missing User data`)
            
            const id: Types.ObjectId | false = toObjectId(idParam)

            if (!id) throw new BadRequestError("Invalid id")

            const updatedUserInfo: UpdateResult = await UserRepository.updateOne(id, data)
            
            if (!updatedUserInfo || updatedUserInfo.matchedCount === 0) throw new NotFoundError(`User not found | Wrong id`)

            return {
                statusCode: StatusCode.OK,
                content: {
                    data: updatedUserInfo,
                    message: `User updated successfully`
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                throw error
            }
            throw new Error()
        }
    }
}

export default new UserService()