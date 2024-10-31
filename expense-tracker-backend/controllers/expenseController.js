let expenses = []; //temp in-memory storage

export const getAllExpenses = (req, res) =>{
    res.json(expenses);
};

export const addExpense = (req, res) =>{
    const expense = req.body;
    expenses.push(expense);
    res.status(201).json(expense);
};

export const deleteExpense = (req, res) => {
    const { id } = req.params;
    expenses = expenses.filter(expense => expense.id !== Number(id));
    res.status(200).json({ message: 'Expense Delted', id});
};

export const updateExpense = (req, res) => {
    const { id } = req.params;
    const updatedExpense = req.body;

    let index = expenses.findIndex(expense => expense.id === Number(id));
    if(index !== -1){
        expenses[index] = updatedExpense; //in memory we update the expense
        return res.status(200).json(updatedExpense);
    }
    res.status(404).json({message: "Expense Not Found"});
}


