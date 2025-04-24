import { Types } from "mongoose"
import { toObjectId } from "../utils"
import { DeleteResult, UpdateResult, StatusCode, ServiceResponse } from "../types"
import { UserRepository, TransactionRepository } from "../repositories"
import { IUser, ITransaction } from "../models"
import { BadRequestError, NotFoundError, UnprocessableEntityError } from "../errors"


class TransactionService{

    getAllTransactions = async (userIdParam: string): Promise<ServiceResponse<ITransaction[]>> => {
        try {
            const userId: Types.ObjectId | false = toObjectId(userIdParam)
            if (!userId) throw new BadRequestError("Invalid user Id param")

            const transactions: ITransaction[] = await TransactionRepository.getAllTransactions(userId)

            const message: string = transactions.length === 0
            ? "No transactions found"
            : "`Transactions retrieved successfully"

            return {
                statusCode: StatusCode.OK,
                content: {
                    data: transactions,
                    message: message,
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
            const userId: Types.ObjectId | false = toObjectId(userIdParam)
            if (!userId) throw new BadRequestError("Invalid user Id param")

            const transactionId: Types.ObjectId | false = toObjectId(transactionIdParam)
            if (!transactionId) throw new BadRequestError("Invalid transaction Id param")

            const transaction: ITransaction | null = await TransactionRepository.getOneTransaction(transactionId, userId)

            if (!transaction) throw new NotFoundError("Transaction not found | Invalid user Id or transaction Id")

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
            const userId: Types.ObjectId | false = toObjectId(userIdParam)
            if (!userId) throw new BadRequestError("Invalid user Id param")

            if ( // Verifies if the User data object exists and has any properties
                !data 
                || Object.keys(data).length === 0
            ) throw new BadRequestError(`Missing User data`)

            if ( // Verifies if all the required user fields are present
                !data.name 
                || !data.amount 
                || !(typeof data.inflow === 'boolean')
                || !data.paymentMethod
            ) throw new UnprocessableEntityError("Missing Transaction required fields")

            const user: IUser | null = await UserRepository.getOne(userId)
            if (!user) throw new NotFoundError("User Not Found | Invalid Id param")

            data.userId = userId //Add the user Id gotten from the auth token on the data object

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
            if ( // Verifies if the User data object exists and has any properties
                !data 
                || Object.keys(data).length === 0
            ) throw new BadRequestError(`Missing User data`)
            
            const userId: Types.ObjectId | false = toObjectId(userIdParam)
            if (!userId) throw new BadRequestError("Invalid user Id param")

            const transactionId: Types.ObjectId | false = toObjectId(transactionIdParam)
            if (!transactionId) throw new BadRequestError("Invalid transaction Id param")

            const oldTransactionAmount: ITransaction | null = await TransactionRepository.getOneTransaction(transactionId, userId)
            if (!oldTransactionAmount) throw new NotFoundError("Transaction not found")

            if (data.amount && data.amount !== oldTransactionAmount.amount) {
                const user: IUser | null = await UserRepository.getOne(userId)
                if (!user) throw new NotFoundError("Could not found user")

                const newUserBalanceAmount: number = oldTransactionAmount.inflow
                ? user.balance + (data.amount - oldTransactionAmount.amount)
                : user.balance - (data.amount - oldTransactionAmount.amount)

                const updatedUserInfo: UpdateResult = await UserRepository.updateUserBalance(newUserBalanceAmount, userId)

                if ( // Verifies if mongoose could find and modify the user balance
                    updatedUserInfo.matchedCount === 0
                    || updatedUserInfo.modifiedCount === 0
                ) throw new NotFoundError("Couldn't update user Balance")
            }

            const updatedTransactionInfo: UpdateResult = await TransactionRepository.updateOneTransaction(transactionId, userId, data)

            if ( // Verifies if mongoose could find and modify the transaction
                updatedTransactionInfo.matchedCount === 0
                || updatedTransactionInfo.modifiedCount === 0
            ) throw new NotFoundError("Transaction not found | Couldn't update transaction")

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
            const userId: Types.ObjectId | false = toObjectId(userIdParam)
            if (!userId) throw new BadRequestError("Invalid user Id param")

            const transactionId: Types.ObjectId | false = toObjectId(transactionIdParam)
            if (!transactionId) throw new BadRequestError("Invalid transaction Id param")


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
            const userId: Types.ObjectId | false = toObjectId(userIdParam)
            if (!userId) throw new BadRequestError("Invalid user Id param")

            const inflowsTransactions: ITransaction[] = await TransactionRepository.getInflows(userId)

            const message: string = inflowsTransactions.length === 0 
            ? "No Inflows transactions found" 
            : "Inflows transactions retrieved successfully"
            
            return {
                statusCode: StatusCode.OK,
                content: {
                    data: inflowsTransactions,
                    message: message
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
            const userId: Types.ObjectId | false = toObjectId(userIdParam)
            if (!userId) throw new BadRequestError("Invalid user Id param")

            const outflowsTransactions: ITransaction[] = await TransactionRepository.getOutflows(userId)

            const message: string = outflowsTransactions.length === 0 
            ? "No Outflows transactions found" 
            : "Outflows transactions retrieved successfully"

            return {
                statusCode: StatusCode.OK,
                content: {
                    data: outflowsTransactions,
                    message: message
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