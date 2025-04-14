import { ITransaction } from "../models/TransactionModel"
import { Types } from "mongoose"
import toObjectId from "../utils/ToObjectId"
import TransactionRepository from "../repositories/TransactionRepository"
import ServiceResponse from "../types/ServiceResponse"
import StatusCode from "../utils/StatusCode"
import Service from "./BaseService"


class TransactionService extends Service<ITransaction> {

    constructor () {
        super(TransactionRepository, "Transaction")
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
                    error: String(error),
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
                    error: String(error),
                    message: "Error retrieving transactions",
                }
            }
        }
    }
}


export default new TransactionService()