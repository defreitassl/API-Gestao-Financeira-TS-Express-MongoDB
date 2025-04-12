import { Router } from 'express'
import TransactionController from '../controllers/TransactionController'

const router = Router()
const transactionController = new TransactionController()


router.get("/:userId/transactions", transactionController.getAll)

router.post("/:userId/transactions/new", transactionController.createOne)

router.delete("/:userId/transactions/:transactionId", transactionController.deleteOne)

router.patch("/:userId/transactions/:transactionId", transactionController.updateOne)

router.get("/:userId/transactions/inflows", transactionController.getInflows)

router.get("/:userId/transactions/outflows", transactionController.getOutflows)

router.get("/:userId/transactions/:transactionId", transactionController.getOne)


// ADICIONAR VALIDACAO DE ID COM FUNCAO ObjectId.isValid()

export default router