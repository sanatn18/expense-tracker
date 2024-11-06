import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import expenseRoutes from './routes/expenseRoutes.js';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';

const app = express();

//mongodb connection
const mongoURI = 'mongodb://localhost:27017/expense_tracker';
mongoose.connect(mongoURI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.error("MongoDB Connection Error", err));

app.use(cors());  //enable CORS
app.use(express.json());

//routes
app.use('/api/expenses', expenseRoutes);
app.use('/api/auth', authRoutes) //add authentication routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
