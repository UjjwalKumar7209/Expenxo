import express, {type Express, type Request, type Response} from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes'
import categoryRoutes from './routes/category.routes'

const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())


app.get('/health', (req: Request, res: Response) => {
    res.json({
        "msg": "healthy"
    })
})

app.use('/api/v1', authRoutes)
app.use('/api/v1', categoryRoutes)


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log("Server is running on port: " + port)
})