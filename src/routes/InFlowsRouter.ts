import { Router, Request, Response } from "express";


const router = Router()


router.get("/transactions/inflows", (req: Request, res: Response): void => {
    res.status(200).send({ gastos: null })
})


export default router