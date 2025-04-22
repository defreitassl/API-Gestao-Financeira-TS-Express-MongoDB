import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError, UnprocessableEntityError } from "../errors"
import { IUser } from "../models/UserModel"
import UserRepository from "../repositories/UserRepository"
import StatusCode from "../types/StatusCode"
import { generateToken } from "../utils/jwt"
import AuthServiceResponse from "../types/AuthServiceResponse"
import { comparePassword, hashPassword } from "../utils/bcrypt"
import isValidEmail from "../utils/validateEmail"
import { Types } from "mongoose"
import toObjectId from "../utils/toObjectId"

class AuthService {

    register = async (data: Partial<IUser>): Promise<AuthServiceResponse> => {
        try {
            if (
                !data 
                || Object.keys(data).length === 0
            ) throw new BadRequestError(`Missing User data`)
            if (
                !data.name 
                || !data.email 
                || !data.password
            ) throw new UnprocessableEntityError("Missing User required fields (name, email or password)")
            if (!isValidEmail(data.email)) throw new UnprocessableEntityError("Invalid User email")

            const existingEmail: IUser | null = await UserRepository.getOneByEmail(data.email)
            if (existingEmail) throw new ConflictError("User Email already exists")

            const hashedPassword: string = await hashPassword(data.password)
            data.password = hashedPassword

            const user: IUser = await UserRepository.createOne(data)
            const { password, transactions, ...userWithoutPassword } = user.toObject()

            const token: string = generateToken({ id: user.id, email: user.email })

            return {
                statusCode: StatusCode.CREATED,
                content: {
                    token: token,
                    user: userWithoutPassword,
                    message: `User registered and logged successfully`
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                throw error
            }
            throw new Error()
        }
    }

    login = async (data: Partial<IUser>): Promise<AuthServiceResponse> => {
        try {
            if (
                !data 
                || Object.keys(data).length === 0
            ) throw new BadRequestError(`Missing User data`)
            if (
                !data.email 
                || !data.password
            ) throw new UnprocessableEntityError("Missing User required fields (name, email or password)")
            if (!isValidEmail(data.email)) throw new UnprocessableEntityError("Invalid User email")

            const user: IUser | null = await UserRepository.getOneByEmail(data.email)
            if (!user) throw new UnauthorizedError("Invalid user credentials")

            const isCorrectPassword: boolean = await comparePassword(data.password, user.password)
            if (!isCorrectPassword) throw new UnauthorizedError("Invalid user credentials")

            const { password, transactions, ...userWithoutPassword } = user.toObject()

            const token: string = generateToken({ id: user.id, email: user.email })

            return {
                statusCode: StatusCode.OK,
                content: {
                    token: token,
                    user: userWithoutPassword,
                    message: `User logged successfully`
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                throw error
            }
            throw new Error()
        }
    }

    me = async (userId: string): Promise<AuthServiceResponse> => {
        try {
            const id: Types.ObjectId | false = toObjectId(userId)
            if (!id) throw new UnauthorizedError("Invalid session credentials")

            const user: IUser | null = await UserRepository.getOne(id)
            if(!user) throw new NotFoundError("Cannot find user in database | Invalid session credentials")

            const { password, ...userWithoutPassword } = user.toObject()

            return {
                statusCode: StatusCode.OK,
                content: {
                    user: userWithoutPassword,
                    message: "User retrieved succesfully"
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

export default new AuthService()