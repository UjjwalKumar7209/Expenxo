import express, { type Request } from 'express'
import { requireAuth } from '../middleware/auth.middleware'
import { expenseController } from '../controllers/expense.controllers'

const router = express.Router()

router.post('/expense', requireAuth, expenseController.postExpense)
router.get('/expense', requireAuth, expenseController.getExpense)
router.delete('/expense', requireAuth, expenseController.deleteExpense)

export default router