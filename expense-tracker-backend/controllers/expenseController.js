import Expense from "../models/Expense.js";

let expenses = []; //temp in-memory storage

// export const getAllExpenses = (req, res) =>{
//     res.json(expenses);
// };

export const getAllExpenses = async(req, res) => {
    try {
        const expenses = await Expense.find({userId: req.user.id});
        res.json(expenses)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expense '})
    }
};

// export const addExpense = (req, res) =>{
//     const expense = req.body;
//     expenses.push(expense);
//     res.status(201).json(expense);
// };

//after setting up mongo:
export const addExpense = async(req, res) =>{
    const { description, amount }= req.body;
    const expense = new Expense({
        userId: req.user.id, //associate the expense with the user thats logged in
        description,
        amount,
    });

    try {
        await expense.save();
        res.status(201).json(expense);

    } catch (error) {
        res.status(400).json({message: 'Error adding expense'})
    }
};
//

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


