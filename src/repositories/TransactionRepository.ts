import { Types, ObjectId} from "mongoose"
import { User, IUser, Transaction, ITransaction } from "../models"
import { DeleteResult, UpdateResult } from "../types"


class TransactionRepository{

    getAllTransactions = async (userId: Types.ObjectId): Promise<ITransaction[]> => {
        const transactions: ITransaction[] = await Transaction
        .where("userId").equals(userId)
        .find()

        return transactions
    }

    getOneTransaction = async (transactionId: Types.ObjectId, userId: Types.ObjectId): Promise<ITransaction | null> => {
        const transaction: ITransaction | null = await Transaction
        .where("userId").equals(userId)
        .where("_id").equals(transactionId)
        .findOne()

        return transaction
    }

    createOneTransaction = async (data: Partial<ITransaction>) => {
        const transaction: ITransaction = await Transaction
        .create(data)

        return transaction
    }

    updateOneTransaction = async (transactionId: Types.ObjectId, userId: Types.ObjectId, data: Partial<ITransaction>): Promise<UpdateResult> => {
        const response: UpdateResult = await Transaction
        .where("userId").equals(userId)
        .where("_id").equals(transactionId)
        .updateOne(data)

        return response
    }

    deleteOneTransaction = async (transactionId: Types.ObjectId, userId: Types.ObjectId): Promise<DeleteResult> => {
        const response: DeleteResult = await Transaction
        .where("userId").equals(userId)
        .where("_id").equals(transactionId)
        .deleteOne()

        return response
    }

    getInflows = async (userId: Types.ObjectId):Promise<ITransaction[]> => {
        const inflowsTransaction: ITransaction[] = await Transaction
        .where("userId").equals(userId)
        .where("inflow").equals(true)
        .find()

        return inflowsTransaction
    }

    getOutflows = async (userId: Types.ObjectId):Promise<ITransaction[]> => {
        const outflowsTransactions = await Transaction
        .where("userId").equals(userId)
        .where('inflow').equals(false)
        .find()

        return outflowsTransactions
    }

    pushTransactionOnUser = async (userId: Types.ObjectId, transactionId: Types.ObjectId): Promise<IUser | null> => {
        const requestInfo: IUser | null = await User.findByIdAndUpdate(userId, {
            $push: { transactions: transactionId }
        })

        return requestInfo
    }

    pullTransactionFromUser = async (userId: Types.ObjectId, transactionId: Types.ObjectId): Promise<IUser | null> => {
        const requestInfo: IUser | null = await User.findByIdAndUpdate(userId, {
            $pull: { transactions: transactionId }
        })

        return requestInfo
    }

    deleteMany = async (transactionsIds: ObjectId[]) => {
        const requestInfo: DeleteResult = await Transaction.deleteMany({
            _id:  {$in: transactionsIds }
        })

        return requestInfo
    }
}


export default new TransactionRepository()