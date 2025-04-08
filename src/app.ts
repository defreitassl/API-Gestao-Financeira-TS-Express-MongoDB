import express, {Express, json} from 'express'
import transactionRoutes from './routes/transactionRoutes'

const createApp = (): Express => {

    const app = express()
    app.use(json())
    app.use(transactionRoutes)


    return app
}

export default createApp