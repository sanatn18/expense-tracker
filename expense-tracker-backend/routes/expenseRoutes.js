// expenseRoutes.js
import express from 'express';
import { getAllExpenses, addExpense, deleteExpense } from '../controllers/expenseController.js';

const router = express.Router();

router.get('/', getAllExpenses);
router.post('/', addExpense);
router.delete('/:id', deleteExpense);

export default router;
