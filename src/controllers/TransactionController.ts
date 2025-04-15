import { NextFunction, Request, Response } from 'express'
import TransactionService from '../services/TransactionService'
import Controller from './BaseController'
import { ITransaction } from '../models/TransactionModel'


class TransactionController extends Controller<ITransaction> {

    constructor () {
        super(TransactionService)
    }

    getAll = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {
            const response = await TransactionService.getAllTransactions(req.params.userId)
            res.status(response.statusCode).json(response.content)
        } catch (error) {
            next(error)
        }
    }

    getOne = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {
            const response = await TransactionService.getOneTransaction(req.params.transactionId, req.params.userId)
            res.status(response.statusCode).json(response.content)
        } catch (error) {
            next(error)
        }
    }

    createOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const response = await TransactionService.createOneTransaction(req.params.userId, req.body)
            res.status(response.statusCode).json(response.content)
        } catch (error) {
            next(error)
        }
    }

    updateOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const response = await TransactionService.updateOneTransaction(req.params.transactionId, req.params.userId, req.body)
            res.status(response.statusCode).json(response.content)
        } catch (error) {
            next(error)
        }
    }

    deleteOne = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {
            const response = await TransactionService.deleteOneTransaction(req.params.transactionId, req.params.userId)
            res.status(response.statusCode).json(response.content)
        } catch (error) {
            next(error)
        }
    }

    getInflows = async (req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {
            const response = await TransactionService.getInflows(req.params.userId)
            res.status(response.statusCode).json(response.content)
        } catch (error) {
            next(error)
        }
    }

    getOutflows = async (req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {
            const response = await TransactionService.getOutflows(req.params.userId)
            res.status(response.statusCode).json(response.content)
        } catch (error) {
            next(error)
        }
    }
}


export default TransactionController