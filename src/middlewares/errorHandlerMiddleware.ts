import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors"

const errorHandler = async (err: Error | unknown, req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            error: err.name,
            message: err.message,
        })
    }

    console.log("Unhandled error: "+ err)

    res.status(500).json({
        error: err,
        status: "error",
        message: "Internal Server Error",
    })
}

export default errorHandler