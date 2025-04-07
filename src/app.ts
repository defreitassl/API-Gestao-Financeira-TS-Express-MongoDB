import express, {Express, json} from 'express'
import inflowsRouter from "./routes/InFlowsRouter"
import outflowsRouter from "./routes/OutFlowsRouter"

const createApp = (): Express => {

    const app = express()
    app.use(json())
    app.use(inflowsRouter)
    app.use(outflowsRouter)
    

    return app
}

export default createApp