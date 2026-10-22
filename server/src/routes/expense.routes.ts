import express, { type Request } from 'express'
import { requireAuth } from '../middleware/auth.middleware'
import { expenseController } from '../controllers/expense.controllers'

const router = express.Router()

router.post('/expense', requireAuth, expenseController.postExpense)

export default router