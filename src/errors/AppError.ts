import StatusCode from "../utils/StatusCode"

export default class AppError extends Error {
    public readonly statusCode: StatusCode
    public readonly isOperational: boolean
  
    constructor(name: string, message: string, statusCode: StatusCode) {
      super(message)
  
      this.statusCode = statusCode
      this.isOperational = true
  
      Object.setPrototypeOf(this, new.target.prototype)
      Error.captureStackTrace(this)
    }
}