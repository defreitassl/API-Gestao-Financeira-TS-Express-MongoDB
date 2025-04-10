import { ITransaction } from "../models/TransactionModel"
import { Types } from "mongoose"
import toObjectId from "../utils/ToObjectId"
import TransactionRepository from "../repositories/TransactionRepository"
import ServiceResponse from "../types/ServiceResponse"
import StatusCode from "../utils/StatusCode"
import DeleteResult from "../types/DeleteRequestResult"
import UpdateResult from "../types/UpdateRequestResult"


class TransactionService {

    getAll = async (userIdParam: string): Promise<ServiceResponse<ITransaction[]>> => {
        try {
            const userId: Types.ObjectId = toObjectId(userIdParam)
            
            const transactions: ITransaction[] = await TransactionRepository.getAll(userId)
            
            if (transactions.length === 0) {
                return {
                    statusCode: StatusCode.NO_CONTENT,
                    content: {
                        data: transactions,
                        message: "No transactions found"
                    }
                }
            }
            return {
                statusCode: StatusCode.OK,
                content: {
                    data: transactions,
                    message: "Transactions retrieved successfully",
                }
            }
            
        } catch (error) {

            if (error instanceof Error) {
                return {
                    statusCode: StatusCode.BAD_REQUEST,
                    content: {
                        message: error.message,
                        error: error.name
                    }
                }
            }
            return {
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
                content: {
                    error: error,
                    message: "Error retrieving transactions",
                }
            }
        }
    }

    getInflows = async (userIdParam: string): Promise<ServiceResponse<ITransaction[]>> => {
        try {
            const userId: Types.ObjectId = toObjectId(userIdParam)

            const inflowsTransactions: ITransaction[] = await TransactionRepository.getInflows(userId)

            if (inflowsTransactions.length === 0) {
                return {
                    statusCode: StatusCode.NO_CONTENT,
                    content: {
                        data: inflowsTransactions,
                        message: "No Inflow transactions found"
                    }
                }
            }
            return {
                statusCode: StatusCode.OK,
                content: {
                    data: inflowsTransactions,
                    message: "Inflows transactions retrieved successfully"
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                return {
                    statusCode: StatusCode.BAD_REQUEST,
                    content: {
                        message: error.message,
                        error: error.name
                    }
                }
            }
            return {
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
                content: {
                    error: error,
                    message: "Error retrieving transactions",
                }
            }
        }
    }

    getOutflows = async (userIdParam: string): Promise<ServiceResponse<ITransaction[]>> => {
        try {
            const userId: Types.ObjectId = toObjectId(userIdParam)

            const outflowsTransactions: ITransaction[] = await TransactionRepository.getOutflows(userId)

            if (outflowsTransactions.length === 0) {
                return {
                    statusCode: StatusCode.NO_CONTENT,
                    content: {
                        data: outflowsTransactions,
                        message: "No Inflow transactions found"
                    }
                }
            }
            return {
                statusCode: StatusCode.OK,
                content: {
                    data: outflowsTransactions,
                    message: "Inflows transactions retrieved successfully"
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                return {
                    statusCode: StatusCode.BAD_REQUEST,
                    content: {
                        message: error.message,
                        error: error.name
                    }
                }
            }
            return {
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
                content: {
                    error: error,
                    message: "Error retrieving transactions",
                }
            }
        }
    }

    getOne = async (transactionIdParam: string, userIdParam: string): Promise<ServiceResponse<ITransaction>> => {
        try {
            const userId: Types.ObjectId = toObjectId(userIdParam)
            const transactionId: Types.ObjectId = toObjectId(transactionIdParam)

            const transaction: ITransaction | null = await TransactionRepository.getOne(transactionId, userId)
            
            if (!transaction) {
                const error = new Error("Transaction not found.")
                return {
                    statusCode: StatusCode.NOT_FOUND,
                    content: {
                        message: error.message,
                        error: "Not Found Error"
                    }
                }
            }
            return {
                statusCode: StatusCode.OK,
                content: {
                    data: transaction,
                    message: "Transaction retrieved successfully"
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                return {
                    statusCode: StatusCode.BAD_REQUEST,
                    content: {
                        message: error.message,
                        error: error.name
                    }
                }
            }
            return {
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
                content: {
                    error: error,
                    message: "Error retrieving transactions",
                }
            }
        }
    }

    createOne = async (data: Partial<ITransaction>): Promise<ServiceResponse<ITransaction>> => {
        try {
            const transaction: ITransaction = await TransactionRepository.createOne(data)
            const updateUserTransactionsInfo: UpdateResult | null = await TransactionRepository.pushTransactionOnUser(transaction.userId, toObjectId(String(transaction._id)))

            if (updateUserTransactionsInfo?.matchedCount === 0) {
                return {
                    statusCode: StatusCode.NOT_FOUND,
                    content: {
                        message: "User not found",
                        error: "Not Found Error"
                    }
                }
            }
            
            return {
                statusCode: StatusCode.CREATED,
                content: {
                    data: transaction,
                    message: "Transaction created successfully"
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                return {
                    statusCode: StatusCode.UNPROCESSABLE_ENTITY,
                    content: {
                        message: error.message,
                        error: error.name
                    }
                }
            }
            return {
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
                content: {
                    error: error,
                    message: "Error retrieving transactions",
                }
            }
        }
    }

    deleteOne = async (transactionIdParam: string, userIdParam: string): Promise<ServiceResponse<DeleteResult>> => {
        try {
            const transactionId: Types.ObjectId = toObjectId(transactionIdParam)
            const userId: Types.ObjectId = toObjectId(userIdParam)

            const deletedTransactionInfo: DeleteResult = await TransactionRepository.deleteOne(transactionId, userId)

            if (deletedTransactionInfo.deletedCount === 0) {
                return {
                    statusCode: StatusCode.NOT_FOUND,
                    content: {
                        message: "Transaction not found",
                        error: "Not Found Error"
                    }
                }
            }

            const updateUserTransactionsInfo: UpdateResult | null = await TransactionRepository.pullTransactionFromUser(userId, transactionId)

            if (!updateUserTransactionsInfo || updateUserTransactionsInfo.matchedCount === 0) {
                return {
                    statusCode: StatusCode.NOT_FOUND,
                    content: {
                        message: "Transaction not found in user's transactions",
                        error: "Not Found Error"
                    }
                }
            }

            return {
                statusCode: StatusCode.OK,
                content: {
                    data: deletedTransactionInfo,
                    message: "Transaction deleted successfully"
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                return {
                    statusCode: StatusCode.BAD_REQUEST,
                    content: {
                        message: error.message,
                        error: error.name
                    }
                }
            }
            return {
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
                content: {
                    error: error,
                    message: "Error deleting transaction",
                }
            }
        }
    }

    updateOne = async (transactionIdParam: string, data: Partial<ITransaction>): Promise<ServiceResponse<UpdateResult>> => {
        try {
            const transactionId: Types.ObjectId = toObjectId(transactionIdParam)

            const updatedTransactionInfo: UpdateResult = await TransactionRepository.updateOne(transactionId, data)

            return {
                statusCode: StatusCode.OK,
                content: {
                    data: updatedTransactionInfo,
                    message: "Transaction updated successfully"
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                return {
                    statusCode: StatusCode.BAD_REQUEST,
                    content: {
                        message: error.message,
                        error: error.name
                    }
                }
            }
            return {
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
                content: {
                    error: error,
                    message: "Error deleting transaction",
                }
            }
        }
    }
}


export default new TransactionService()