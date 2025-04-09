import { ITransaction } from "../models/TransactionModel"
import TransactionRepository from "../repositories/TransactionRepository"
import ServiceResponse from "../utils/ServiceResponse"
import StatusCode from "../utils/StatusCode"


class TransactionService {

    getAll = async (): Promise<ServiceResponse<ITransaction[]>> => {
        try {
            const transactions: ITransaction[] = await TransactionRepository.getAll()
            
            if (transactions.length === 0) {
                return {
                    statusCode: StatusCode.NO_CONTENT,
                    content: {
                        message: "No transactions found",
                        data: transactions
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
            return {
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
                content: {
                    message: "Error retrieving transactions",
                }
            }
        }
    }

    getInflows = async () => {
        const inflowsTransaction: ITransaction[] = await TransactionRepository.getInflows()
        return inflowsTransaction
    }

    getOutflows = async () => {
        const outflowsTransactions = await TransactionRepository.getOutflows()
        return outflowsTransactions
    }

    getOne = async (id: string) => {
        const transaction: ITransaction | null = await TransactionRepository.getOne(id)
        return transaction
    }

    createOne = async (data: Partial<ITransaction>) => {
        const transaction: ITransaction = await TransactionRepository.createOne(data)
        return transaction
    }
}


export default new TransactionService()