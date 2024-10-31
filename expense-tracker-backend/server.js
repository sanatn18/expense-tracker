import express from 'express';
import cors from 'cors';

import expenseRoutes from './routes/expenseRoutes.js';

const app = express();

app.use(cors());  //enable CORS
app.use(express.json());
app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
