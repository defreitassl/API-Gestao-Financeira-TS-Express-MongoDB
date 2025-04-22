import express, {Express, json} from 'express'
import transactionRoutes from './routes/transactionRoutes'
import userRoutes from './routes/userRoutes'
import categoryRoutes from './routes/categoryRoutes'
import errorHandler from './middlewares/errorHandlerMiddleware'
import authRoutes from './routes/authRoutes'

const createApp = (): Express => {

    const app = express()
    app.use(json())
    app.use(transactionRoutes)
    app.use(userRoutes)
    app.use(categoryRoutes)
    app.use(authRoutes)
    app.use(errorHandler)


    return app
}

export default createApp