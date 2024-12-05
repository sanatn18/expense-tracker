import React, {useState} from 'react';
import { addExpense } from '../redux/expensesSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewExpense } from '../services/expenseService';
import { useDispatch } from 'react-redux';

const AddExpenseForm = () => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const dispatch = useDispatch(); // initialize the redux dispatch function, allows us to send actions to redux store.
    const queryClient = useQueryClient();


    //mutation to add a new expense
    const addMutation = useMutation({
        mutationFn: addNewExpense, // addNewExpense function simulates a server-side API call to add an expense
        onSuccess: (newExpense) => {
            queryClient.invalidateQueries(['expenses']); // Refetch expenses to keep the UI updated
            dispatch(addExpense(newExpense)); // Dispatches the addExpense action to Redux
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name && amount) {
            const newExpense = {
                description: name,  // match the backend field
                amount: parseFloat(amount), // ensure it's a number
                date: new Date().toISOString(), // ensrue a valid date
            };
    
            try {
                await addMutation.mutateAsync(newExpense);
                console.log("Expense added:", newExpense);
            } catch (error) {
                console.error("Error adding expense:", error);
            }
            setName("");
            setAmount("");
        }else {
            console.error("Validation error: Name or amount is missing");
        }
    };
    
    return(
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder='Expense Name'
            />
            <input
                type="text"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
                placeholder='Amount'
            />
            <button type="submit"> Add Expense</button>
        </form>
    );
};

export default AddExpenseForm;
