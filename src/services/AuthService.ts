import { BadRequestError, ConflictError, UnprocessableEntityError } from "../errors"
import { IUser } from "../models/UserModel"
import UserRepository from "../repositories/UserRepository"
import StatusCode from "../types/StatusCode"
import { generateToken } from "../utils/jwt"
import AuthServiceResponse from "../types/AuthServiceResponse"
import { hashPassword } from "../utils/bcrypt"
import isValidEmail from "../utils/validateEmail"

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
            const { password, transactions, ...userWithoutPassword } = user

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
            
        } catch (error) {
            if (error instanceof Error) {
                throw error
            }
            throw new Error()
        }
    }

    logout = async (): Promise<ServiceResponse<null>> => {
        try {
            
        } catch (error) {
            if (error instanceof Error) {
                throw error
            }
            throw new Error()
        }
    }

    me = async (): Promise<ServiceResponse<IUser>> => {
        try {
            
        } catch (error) {
            if (error instanceof Error) {
                throw error
            }
            throw new Error()
        }
    }
}

export default new AuthService()