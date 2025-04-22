import { Request, Response, NextFunction } from "express"
import StatusCode from "../types/StatusCode"
import { verifyToken } from "../utils/jwt"


const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers['authorization']
    const token: string | undefined = authHeader?.split(' ')[1]
    if (!token) {
        res.status(StatusCode.UNAUTHORIZED).json({
            error: "Unauthorized Error",
            message: "No session token provided"
        })
    } else {
        try {
            const decodedToken = verifyToken(token)
            if (!decodedToken.id || !decodedToken.email)
            req.user = { id: decodedToken.id, email: decodedToken.email}
            next()
        } catch (error) {
            res.status(StatusCode.UNAUTHORIZED).json({
                error: "Unauthorized Error",
                message: "Invalid or expired token"
            });
        }
    }
}

export default authMiddleware 