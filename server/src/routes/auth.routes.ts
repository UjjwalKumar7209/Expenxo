import express from 'express'
import authController from '../controllers/auth.controllers'
import { requireAuth } from '../middleware/auth.middleware'

const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/me', requireAuth, authController.getMe);


export default router;