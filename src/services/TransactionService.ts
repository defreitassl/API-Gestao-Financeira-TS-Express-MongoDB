import { ITransaction } from "../models/TransactionModel"
import { Types } from "mongoose"
import ServiceResponse from "../types/ServiceResponse"
import StatusCode from "../utils/StatusCode"
import Service from "./BaseService"
import TransactionRepository from "../repositories/TransactionRepository"
import toObjectId from "../utils/ToObjectId"
import DeleteResult from "../types/DeleteRequestResult"
import UpdateResult from "../types/UpdateRequestResult"


class TransactionService extends Service<ITransaction> {

    constructor () {
        super(TransactionRepository, "Transaction")
    }

    getAllTransactions = async (userIdParam: string): Promise<ServiceResponse<ITransaction[]>> => {
        try {
            const userId: Types.ObjectId = toObjectId(userIdParam)
            const transactions: ITransaction[] = await TransactionRepository.getAllTransactions(userId)

            const statusCode: StatusCode = transactions.length === 0 ? StatusCode.NO_CONTENT : StatusCode.OK
            
            return {
                statusCode: statusCode,
                content: {
                    data: transactions,
                    message: `Transactions retrieved successfully`,
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                throw error
            }
            throw new Error()
        }
    }

    getOneTransaction = async (transactionIdParam: string, userIdParam: string): Promise<ServiceResponse<ITransaction>> => {
        try {
            const userId: Types.ObjectId = toObjectId(userIdParam)
            const transactionId: Types.ObjectId = toObjectId(transactionIdParam)

            const transaction: ITransaction | null = await TransactionRepository.getOneTransaction(transactionId, userId)

            if (!transaction) {
                return {
                    statusCode: StatusCode.NOT_FOUND,
                    content: {
                        message: `Transaction not found`,
                        error: "Not Found Error"
                    }
                }
            }

            return {
                statusCode: StatusCode.OK,
                content: {
                    data: transaction,
                    message: `Transaction retrieved successfully`
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                throw error
            }
            throw new Error()
        }
    }

    createOneTransaction = async (userIdParam: string, data: Partial<ITransaction>): Promise<ServiceResponse<ITransaction>> => {
        try {
            const userId: Types.ObjectId = toObjectId(userIdParam)
            const transaction: ITransaction = await TransactionRepository.createOneTransaction(data)
            
            if (Types.ObjectId.isValid(transaction.id) === true) {
                const updatedUserInfo: ITransaction | null = await TransactionRepository.pushTransactionOnUser(userId, transaction.id)
                if (!updatedUserInfo) {
                    return {
                        statusCode: StatusCode.NOT_FOUND,
                        content: {
                            message: `User not found | Invalid ID aaaaa`,
                            error: "Not Found Error"
                        }
                    }
                }
            }
            return {
                statusCode: StatusCode.CREATED,
                content: {
                    data: transaction,
                    message: `Transaction created successfully`
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                throw error
            }
            throw new Error()
        }
    }

    updateOneTransaction = async (transactionIdParam: string, userIdParam: string, data: Partial<ITransaction>): Promise<ServiceResponse<UpdateResult>> => {
        try {
            const userId: Types.ObjectId = toObjectId(userIdParam)
            const transactionId: Types.ObjectId = toObjectId(transactionIdParam)

            const updatedTransactionInfo: UpdateResult = await TransactionRepository.updateOneTransaction(transactionId, userId, data)

            if (!updatedTransactionInfo || updatedTransactionInfo.matchedCount === 0) {
                return {
                    statusCode: StatusCode.NOT_FOUND,
                    content: {
                        data: updatedTransactionInfo,
                        message: `Transaction not found`,
                        error: "Not Found Error"
                    }
                }
            }

            return {
                statusCode: StatusCode.OK,
                content: {
                    data: updatedTransactionInfo,
                    message: `Transaction updated successfully`
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                throw error
            }
            throw new Error()
        }
    }

    deleteOneTransaction = async (transactionIdParam: string, userIdParam: string): Promise<ServiceResponse<DeleteResult>> => {
        try {
            const userId: Types.ObjectId = toObjectId(userIdParam)
            const transactionId: Types.ObjectId = toObjectId(transactionIdParam)

            const deletedTransactionInfo: DeleteResult = await TransactionRepository.deleteOneTransaction(transactionId, userId)

            if (!deletedTransactionInfo || deletedTransactionInfo.deletedCount === 0) {
                return {
                    statusCode: StatusCode.NOT_FOUND,
                    content: {
                        message: `Trasaction not found`,
                        error: "Not Found Error"
                    }
                }
            }

            const updatedUserInfo: UpdateResult | null = await TransactionRepository.pullTransactionFromUser(userId, transactionId)

            if (updatedUserInfo?.matchedCount === 0) {
                return {
                    statusCode: StatusCode.NOT_FOUND,
                    content: {
                        message: `User or Transaction not found | Invalid ID`,
                        error: "Not Found Error"
                    }
                }
            }
            return {
                statusCode: StatusCode.OK,
                content: {
                    data: deletedTransactionInfo,
                    message: `${this.entityName} deleted successfully`
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                throw error
            }
            throw new Error()
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
                throw error
            }
            throw new Error()
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
                throw error
            }
            throw new Error()
        }
    }
}


export default new TransactionService()