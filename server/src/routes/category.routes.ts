import express from 'express'
import { categoryController } from '../controllers/category.controllers';
import { requireAuth } from '../middleware/auth.middleware';

const router = express.Router()

router.get('/category', requireAuth, categoryController.getCategories);
router.post('/category', requireAuth, categoryController.postCategory)
router.delete('/category', requireAuth, categoryController.deleteCategory)
router.put('/category', requireAuth, categoryController.updateCategory)

export default router