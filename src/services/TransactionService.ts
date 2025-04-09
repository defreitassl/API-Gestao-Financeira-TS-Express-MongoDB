import { ITransaction } from "../models/TransactionModel"
import Transaction from "../models/TransactionModel"


class TransactionService {

    getAll = async (): Promise<ITransaction[]> => {
        const transactions: ITransaction[] = await Transaction.find()
        return transactions
    }

    getInflows = async ():Promise<ITransaction[]> => {
        const inflowsTransaction: ITransaction[] = await Transaction.find().where('inflow').equals(true)
        return inflowsTransaction
    }

    getOutflows = async ():Promise<ITransaction[]> => {
        const outflowsTransactions = await Transaction.find().where('inflow').equals(false)
        return outflowsTransactions
    }

    getOne = async (id: string): Promise<ITransaction | null> => {
        const transaction: ITransaction | null = await Transaction.findById(id)
        return transaction
    }

    createOne = async (data: Partial<ITransaction>):Promise<ITransaction> => {
        const transaction: ITransaction = await Transaction.create(data)
        return transaction
    }
}


export default new TransactionService()