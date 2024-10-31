// expenseRoutes.js
import express from 'express';
import { getAllExpenses, addExpense, deleteExpense, updateExpense } from '../controllers/expenseController.js';

const router = express.Router();

router.get('/', getAllExpenses);
router.post('/', addExpense);
router.delete('/:id', deleteExpense);
router.put('/api/expenses/:id', updateExpense);


export default router;
