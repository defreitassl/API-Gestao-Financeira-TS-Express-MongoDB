import { ITransaction } from "../models/TransactionModel"
import { Types } from "mongoose"
import ServiceResponse from "../types/ServiceResponse"
import StatusCode from "../utils/StatusCode"
import TransactionRepository from "../repositories/TransactionRepository"
import toObjectId from "../utils/ToObjectId"
import DeleteResult from "../types/DeleteRequestResult"
import UpdateResult from "../types/UpdateRequestResult"
import UserRepository from "../repositories/UserRepository"
import { IUser } from "../models/UserModel"
import { BadRequestError, NotFoundError, UnprocessableEntityError } from "../errors"


class TransactionService{

    getAllTransactions = async (userIdParam: string): Promise<ServiceResponse<ITransaction[]>> => {
        try {
            const userId: Types.ObjectId = toObjectId(userIdParam)
            const transactions: ITransaction[] = await TransactionRepository.getAllTransactions(userId)

            return {
                statusCode: StatusCode.OK,
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
            if ( // Verifies if the User data object exists and has any properties
                !data 
                || Object.keys(data).length === 0
            ) throw new BadRequestError(`Missing User data`)

            if ( // Verifies if all the required user fields are present
                !data.userId 
                ||!data.categoryId
                || !data.name 
                || !data.amount 
                || !(typeof data.inflow === 'boolean')
                || !data.paymentMethod
            ) throw new UnprocessableEntityError("Missing Transaction required fields")

            const userId: Types.ObjectId = toObjectId(userIdParam)
            if (!Types.ObjectId.isValid(userIdParam)) throw new BadRequestError("Invalid User Id param")

            const user: IUser | null = await UserRepository.getOne(userId)
            if (!user) throw new NotFoundError("User Not Found | Invalid Id param")

            const transaction: ITransaction = await TransactionRepository.createOneTransaction(data)

            const newBalanceAmount: number = transaction.inflow ? (user.balance + transaction.amount) : (user.balance - transaction.amount)
            const updatedUserBalanceInfo: UpdateResult = await UserRepository.updateUserBalance(newBalanceAmount, userId)

            if (updatedUserBalanceInfo.modifiedCount === 0) throw new Error()
            
            const updatedUserInfo: IUser | null = await TransactionRepository.pushTransactionOnUser(userId, transaction.id)
            if (!updatedUserInfo) throw new Error()
            
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

            if (!updatedTransactionInfo || updatedTransactionInfo.modifiedCount === 0) {
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

            if ( // Verifies if the transaction IDs are valid IDs
                !Types.ObjectId.isValid(userId) 
                || !Types.ObjectId.isValid(transactionId)
            ) throw new BadRequestError("Invalid User Id or Transaction Id param")

            const transaction: ITransaction | null = await TransactionRepository.getOneTransaction(transactionId, userId)
            if (!transaction) throw new NotFoundError("Transaction not found")

            const user: IUser | null = await UserRepository.getOne(userId)
            if (!user) throw new NotFoundError("User not found | Couldn't update user balance and transactions")

            const deletedTransactionInfo: DeleteResult = await TransactionRepository.deleteOneTransaction(transactionId, userId)
            if ( // Verifies if mongoose could find the transaction and deleted it
                deletedTransactionInfo.deletedCount === 0
            ) throw new NotFoundError("Transaction not found | Couldn't delete the transaction")

            const newBalanceAmount: number = transaction.inflow ? (user.balance - transaction.amount) : (user.balance + transaction.amount)
            
            const updatedUserBalanceInfo: UpdateResult = await UserRepository.updateUserBalance(newBalanceAmount, userId)
            if (updatedUserBalanceInfo.modifiedCount === 0) throw new Error()

            const updatedUserInfo: IUser | null = await TransactionRepository.pullTransactionFromUser(userId, transactionId)
            if (!updatedUserInfo) throw new Error()

            return {
                statusCode: StatusCode.OK,
                content: {
                    data: deletedTransactionInfo,
                    message: `Transaction deleted successfully`
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