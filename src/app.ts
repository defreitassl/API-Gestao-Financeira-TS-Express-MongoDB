import express, {Express, json} from 'express'
import transactionRoutes from './routes/transactionRoutes'
import userRoutes from './routes/userRoutes'
import categoryRoutes from './routes/categoryRoutes'

const createApp = (): Express => {

    const app = express()
    app.use(json())
    app.use(transactionRoutes)
    app.use(userRoutes)
    app.use(categoryRoutes)


    return app
}

export default createApp