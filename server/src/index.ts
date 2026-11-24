import express, {type Express, type Request, type Response} from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes'
import categoryRoutes from './routes/category.routes'
import expenseRoutes from './routes/expense.routes'
import redisClient from './config/redis'


const app: Express = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())


app.get('/health', (req: Request, res: Response) => {
    res.json({
        msg: "healthy"
    })
})
app.get('/', (req: Request, res: Response) => {
    return res.json({
        msg: "Welcome to Expenxo!"
    })
})
app.use('/api/v1', authRoutes)
app.use('/api/v1', categoryRoutes)
app.use('/api/v1', expenseRoutes);


const PORT = process.env.PORT || 5000

async function startServer() {
  try {
    await redisClient.connect();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();