import AppError from "./AppError"
import StatusCode from "../utils/StatusCode";


class BadRequestError extends AppError {
    constructor(message = "Bad request") {
      super("Bad Request Error", message, StatusCode.BAD_REQUEST);
    }
  }
  
class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
      super("Unauthorized Error", message, StatusCode.UNAUTHORIZED);
    }
  }
  
class ForbiddenError extends AppError {
    constructor(message = "Forbidden") {
      super("Forbidden Error", message, StatusCode.FORBIDDEN);
    }
  }
  
class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
      super("Not Found Error", message, StatusCode.NOT_FOUND);
    }
  }
  
class ConflictError extends AppError {
    constructor(message = "Conflict occurred") {
      super("Conflict Error", message, StatusCode.CONFLICT);
    }
  }
  
class UnprocessableEntityError extends AppError {
    constructor(message = "Unprocessable entity") {
      super("Unprocessable Entity Error", message, StatusCode.UNPROCESSABLE_ENTITY);
    }
  }

export {
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
    UnprocessableEntityError
}