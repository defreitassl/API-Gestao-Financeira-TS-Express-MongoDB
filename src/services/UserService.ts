import { Types } from "mongoose"
import { BadRequestError, NotFoundError } from "../errors"
import { IUser } from "../models/UserModel"
import { UserRepository } from "../repositories"
import { ServiceResponse, UpdateResult, StatusCode } from "../types"
import { Service } from "./"
import { toObjectId } from "../utils"


class UserService extends Service<IUser> {
    constructor () {
        super(UserRepository, "User")
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