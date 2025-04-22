import { Request, Response, NextFunction } from "express"
import AppError from "../errors/AppError"

const errorHandler = async (err: Error | unknown, req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            error: err.name,
            message: err.message,
        })
    }

    // Erros não operacionais (ex: bugs)
    console.error("Unhandled error:", err)

    res.status(500).json({
        status: "error",
        message: "Internal Server Error",
    })
}

export default errorHandler