import { Router } from 'express'
import TransactionController from '../controllers/TransactionController'

const router = Router()
const transactionController = new TransactionController()


router.get("/:userId/transactions", transactionController.getAll)

router.post("/:userId/transactions", transactionController.createOne)

router.get("/:userId/transactions/inflows", transactionController.getInflows)

router.get("/:userId/transactions/outflows", transactionController.getOutflows)


export default router