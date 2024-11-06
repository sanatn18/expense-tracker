// expenseRoutes.js
import express from 'express';
import { getAllExpenses, addExpense, deleteExpense, updateExpense } from '../controllers/expenseController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, getAllExpenses);
router.post('/', authenticateToken, addExpense);
router.delete('/:id',authenticateToken, deleteExpense);
router.put('/:id', authenticateToken, updateExpense);


export default router;
