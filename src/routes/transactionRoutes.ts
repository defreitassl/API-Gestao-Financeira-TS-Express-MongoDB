import { Router } from 'express'
import { TransactionController } from '../controllers'
import { authMiddleware } from '../middlewares'

const router = Router()
const transactionController = new TransactionController()


router.get("/transactions", authMiddleware, transactionController.getAll)

router.post("/transactions/new", authMiddleware, transactionController.createOne)

router.delete("/transactions/:transactionId", authMiddleware, transactionController.deleteOne)

router.patch("/transactions/:transactionId", authMiddleware, transactionController.updateOne)

router.get("/transactions/inflows", authMiddleware, transactionController.getInflows)

router.get("/transactions/outflows", authMiddleware, transactionController.getOutflows)

router.get("/transactions/:transactionId", authMiddleware, transactionController.getOne)

export default router