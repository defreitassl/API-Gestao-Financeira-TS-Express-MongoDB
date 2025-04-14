import { Types } from "mongoose"
import { ITransaction } from "../models/TransactionModel"
import Transaction from "../models/TransactionModel"
import User from "../models/UserModel"
import DeleteResult from "../types/DeleteRequestResult"
import UpdateResult from "../types/UpdateRequestResult"
import Repository from "./BaseRepository"


class TransactionRepository extends Repository<ITransaction> {

    constructor() {
        super(Transaction)
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

    pushTransactionOnUser = async (userId: Types.ObjectId, transactionId: Types.ObjectId): Promise<UpdateResult | null> => {
        const requestInfo: UpdateResult | null = await User.findByIdAndUpdate(userId, {
            $push: { transactions: transactionId }
        })

        return requestInfo
    }

    pullTransactionFromUser = async (userId: Types.ObjectId, transactionId: Types.ObjectId): Promise<UpdateResult | null> => {
        const requestInfo: UpdateResult | null = await User.findByIdAndUpdate(userId, {
            $pull: { transactions: transactionId }
        })

        return requestInfo
    }
}


export default new TransactionRepository()