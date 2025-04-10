import { Request, Response } from 'express'
import TransactionService from '../services/TransactionService'


class TransactionController {

    getAll = async ( req: Request, res: Response ): Promise<void> => { 
        const response = await TransactionService.getAll(req.params.userId)
        res.status(response.statusCode).json(response.content)
    }

    getInflows = async (req: Request, res: Response ): Promise<void> => {
        const response = await TransactionService.getInflows(req.params.userId)
        res.status(response.statusCode).json(response.content)
    }

    getOutflows = async (req: Request, res: Response ): Promise<void> => {
        const response = await TransactionService.getOutflows(req.params.userId)
        res.status(response.statusCode).json(response.content)
    }

    getOne = async ( req: Request, res: Response ): Promise<void> => {
        const response = await TransactionService.getOne(req.params.transactionId, req.params.userId)
        res.status(response.statusCode).json(response.content)
    }

    createOne = async ( req: Request, res: Response ): Promise<void> => {
        const response = await TransactionService.createOne(req.body)
        res.status(response.statusCode).json(response.content)
    }

    deleteOne = async ( req: Request, res: Response ): Promise<void> => {
        const response = await TransactionService.deleteOne(req.params.transactionId, req.params.userId)
        res.status(response.statusCode).json(response.content)
    }

    updateOne = async ( req: Request, res: Response ): Promise<void> => {
        const response = await TransactionService.updateOne(req.params.transactionId, req.body)
        res.status(response.statusCode).json(response.content)
    }
}


export default TransactionController