import jwt, { Secret } from 'jsonwebtoken'
import jwtOptions from '../config/jwt'


interface IPayload {
    id: string,
    email: string
}

const secretKey: Secret | undefined = process.env.SECRET_KEY

if (!secretKey) throw new Error("Couldn't find SECRET_KEY at environment variables")

const generateToken = (userPayload: IPayload): string => {
    const sessionToken: string = jwt.sign(userPayload, secretKey, jwtOptions)
    return sessionToken
}

export { generateToken }