import { Request, Response } from 'express'
import Transaction from '../models/TransactionModel'


class TransactionController {

    getAll = async ( req: Request, res: Response ): Promise<void> => { 
        const transactions = await Transaction.find()
        res.status(200).json(transactions)
    }

    getInflows = async (req: Request, res: Response ): Promise<void> => {
        res.status(200).json({ gastos: null })
    }

    getOutflows = async (req: Request, res: Response ): Promise<void> => {
        res.status(200).json({ gastos: null })
    }

    createOne = async (req: Request, res: Response ): Promise<void> => {

        const transaction = req.body

        await Transaction.create(transaction)

        res.status(200).json({ transaction })
    }
}


export default TransactionController