import {Express, Request, Response} from 'express'
import createApp from './app'
import connectDB from './config/database'


const app: Express = createApp()
const port: string | undefined = process.env.PORT


app.get('/', (req: Request, res: Response): void => {
    res.status(200).send('Financial Management API')
})


connectDB()
app.listen(port)
console.log(`Server running on port ${port}`)
