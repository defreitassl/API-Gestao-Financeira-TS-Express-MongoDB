import jwt, { Secret } from 'jsonwebtoken'
import jwtOptions from '../config/jwt'
import { UnauthorizedError } from '../errors'


interface IPayload {
    id: string,
    email: string
}

const SECRET_KEY: Secret | undefined = process.env.SECRET_KEY

const generateToken = (userPayload: IPayload): string => {
    if (!SECRET_KEY) throw new Error("Couldn't find SECRET_KEY at environment variables")

    const sessionToken: string = jwt.sign(userPayload, SECRET_KEY, jwtOptions)
    return sessionToken
}

const verifyToken = (token: string): jwt.JwtPayload => {
    if (!SECRET_KEY) throw new Error("Couldn't find SECRET_KEY at environment variables")

    const decodedToken: string | jwt.JwtPayload = jwt.verify(token, SECRET_KEY)
    if (typeof decodedToken === 'string') throw new UnauthorizedError("Invalid token payload")

    return decodedToken
}

export { generateToken, verifyToken, IPayload }