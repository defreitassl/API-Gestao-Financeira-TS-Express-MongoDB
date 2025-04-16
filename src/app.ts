import express, {Express, json, urlencoded} from 'express'
import transactionRoutes from './routes/transactionRoutes'
import userRoutes from './routes/userRoutes'
import categoryRoutes from './routes/categoryRoutes'
import errorHandler from './middlewares/errorHandler'

const createApp = (): Express => {

    const app = express()
    app.use(json())
    app.use(transactionRoutes)
    app.use(userRoutes)
    app.use(categoryRoutes)
    app.use(errorHandler)


    return app
}

export default createApp