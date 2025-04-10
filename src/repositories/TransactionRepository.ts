import { Types } from "mongoose"
import { ITransaction } from "../models/TransactionModel"
import Transaction from "../models/TransactionModel"
import User, { IUser } from "../models/UserModel"
import DeleteResult from "../types/DeleteRequestResult"
import UpdateResult from "../types/UpdateRequestResult"


class TransactionRepository {

    getAll = async (userId: Types.ObjectId): Promise<ITransaction[]> => {
        const transactions: ITransaction[] = await Transaction
        .where("userId").equals(userId)
        .find()

        return transactions
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

    getOne = async (transactionId: Types.ObjectId, userId: Types.ObjectId): Promise<ITransaction | null> => {
        const transaction: ITransaction | null = await Transaction
        .where("userId").equals(userId)
        .findById(transactionId)

        return transaction
    }

    createOne = async (data: Partial<ITransaction>): Promise<ITransaction> => {
        const transaction: ITransaction = await Transaction.create(data)
        return transaction
    }

    pushTransactionOnUser = async (userId: Types.ObjectId, transactionId: Types.ObjectId): Promise<UpdateResult | null> => {
        const requestInfo: UpdateResult | null = await User.findByIdAndUpdate(userId, {
            $push: { transactions: transactionId }
        })

        return requestInfo
    }

    deleteOne = async (transactionId: Types.ObjectId, userId: Types.ObjectId): Promise<DeleteResult> => {
        const requestInfo: DeleteResult = await Transaction
        .where("_id").equals(transactionId)
        .deleteOne()

        return requestInfo
    }

    pullTransactionFromUser = async (userId: Types.ObjectId, transactionId: Types.ObjectId): Promise<UpdateResult | null> => {
        const requestInfo: UpdateResult | null = await User.findByIdAndUpdate(userId, {
            $pull: { transactions: transactionId }
        })

        return requestInfo
    }

    updateOne = async (transactionId: Types.ObjectId, data: Partial<ITransaction>): Promise<UpdateResult> => {
        const requestInfo: UpdateResult = await Transaction
        .where("_id").equals(transactionId)
        .updateOne(data)
        return requestInfo
    }
}


export default new TransactionRepository()