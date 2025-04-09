import { Request, Response } from 'express'
import TransactionService from '../services/TransactionService'


class TransactionController {

    getAll = async ( req: Request, res: Response ): Promise<void> => { 
        const transactions = await TransactionService.getAll()
        res.status(200).json(transactions)
    }

    getInflows = async (req: Request, res: Response ): Promise<void> => {

        const inflowsTransaction = await TransactionService.getInflows()

        res.status(200).json(inflowsTransaction)
    }

    getOutflows = async (req: Request, res: Response ): Promise<void> => {

        const outflowsTransactions = await TransactionService.getOutflows()

        res.status(200).json(outflowsTransactions)
    }

    getOne = async ( req: Request, res: Response ): Promise<void> => {
        const transaction = await TransactionService.getOne(req.params.id)
        res.status(200).json(transaction)
    }

    createOne = async (req: Request, res: Response ): Promise<void> => {

        const transaction = await TransactionService.createOne(req.body)

        res.status(200).json({ transaction })
    }
}


export default TransactionController