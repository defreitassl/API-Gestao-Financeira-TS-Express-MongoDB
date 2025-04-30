import { Types } from "mongoose"
import { BadRequestError, ForbiddenError, NotFoundError } from "../errors"
import { IUser } from "../models/UserModel"
import { TransactionRepository, UserRepository } from "../repositories"
import { ServiceResponse, UpdateResult, StatusCode, DeleteResult } from "../types"
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
            if (!id) throw new BadRequestError("Invalid id provided")
            
            // Prohibits the user from updating his own balance manually
            if ('balance' in data) throw new ForbiddenError('Cannot update balance manually')

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

    deleteOneUser = async (idParam: string): Promise<ServiceResponse<DeleteResult>> => {
        try {
            const id: Types.ObjectId | false = toObjectId(idParam)
            if (!id) throw new BadRequestError("Invalid id provided")

            const user: IUser | null = await UserRepository.getOne(id)
            if (!user) throw new NotFoundError("User not found | Wrong id")

            const deletedUserTransactionsInfo: DeleteResult = await TransactionRepository.deleteMany(user.transactions)
            console.log(deletedUserTransactionsInfo)
            const deletedUserInfo: DeleteResult = await UserRepository.deleteOne(id)
            if (
                deletedUserTransactionsInfo.deletedCount === 0
                || deletedUserInfo.deletedCount === 0
            ) throw new Error("Something went wrong while deleting user.")

            return {
                statusCode: StatusCode.OK,
                content: {
                    data: deletedUserInfo,
                    message: "User deleted sucessfully"
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