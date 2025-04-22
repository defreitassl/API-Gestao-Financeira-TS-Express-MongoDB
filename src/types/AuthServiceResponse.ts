import { IUser } from "../models/UserModel"

interface AuthServiceResponse{
    statusCode: number,
    content: {
        token: string,
        user: Partial<IUser>,
        error?: string | unknown,
        message?: string
    }
}

export default AuthServiceResponse