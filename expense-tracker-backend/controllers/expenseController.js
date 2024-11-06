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
    const { amount, description, date }= req.body;
    try {

    const expense = new Expense({
        userId: req.user.id, //associate the expense with the user thats logged in
        description,
        amount,
        date,
    });

        await expense.save();
        res.status(201).json(expense);

    } catch (error) {
        res.status(400).json({message: 'Error adding expense'})
    }
};
//


export const updateExpense = async(req, res) => {
    const { id } = req.params;
    const { amount, description, date} = req.body;

    try{
        const expense = await Expense.findOneAndUpdate(
            {_id: id, userId: req.user.id},
            { amount, description, date },
            { new: true}
        );
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json(expense);
    } catch (error) {
        res.status(400).json({ message: 'Error updating expense' });
    }
};


export const deleteExpense = async(req, res) => {
    const { id } = req.params;
    try{
        const expense = await Expense.findOneAndDelete({ _id: id, userId: req.user.id});
        if (!expense){
            return res.status(404).json({message: 'Expense Not Found'});
        }
        res.status(200).json({message: 'Expense Delted'});
    }catch(error){
        res.status(500).json({message: 'Error occured deleting'});
    }
}


