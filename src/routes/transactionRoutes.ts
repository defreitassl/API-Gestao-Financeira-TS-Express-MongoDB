import { Router } from 'express'
import TransactionController from '../controllers/TransactionController'

const router = Router()
const transactionController = new TransactionController()


router.get("/:userId/transactions", transactionController.getAll)

router.post("/transactions/new", transactionController.createOne)

router.delete("/:userId/transactions/:transactionId", transactionController.deleteOne)

router.patch("/transactions/:transactionId", transactionController.updateOne)

router.get("/:userId/transactions/inflows", transactionController.getInflows)

router.get("/:userId/transactions/outflows", transactionController.getOutflows)

router.get("/:userId/transactions/:transactionId", transactionController.getOne)


export default router