import express, { Express, json } from 'express'
import { userRouter, transactionRouter, categoryRouter, authRouter } from './routes'
import { errorHandler } from './middlewares'
import cors from 'cors'

const createApp = (): Express => {

    const app = express()
    app.use(cors({
        origin: 'http://localhost:5173'
    }))
    app.use(json())
    app.use(userRouter)
    app.use(transactionRouter)
    app.use(categoryRouter)
    app.use(authRouter)
    app.use(errorHandler)


    return app
}

export default createApp