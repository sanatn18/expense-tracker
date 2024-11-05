import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateExpense } from "../redux/expensesSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { updateExpenseAPI } from '../services/expenseService';

const UpdateExpenseForm = ({expense, onCancel}) => {
    const [name, setName] = useState(expense.name);
    const [amount, setAmount] = useState(expense.amount);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (updatedExpense) => {

            const response = await fetch(`http://localhost:5000/api/expenses/${updatedExpense.id}`, {  // use the backend port here
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',// indicates that the request body will be in JSON format since the backend expects JSON data for correct parsing.
                },
                body: JSON.stringify(updatedExpense), //converts the updatedExpense object into a JSON-formatted string so it can be sent in the request
            });

            if (!response.ok) {
                // Handle the 404 error here
                if (response.status === 404) {
                    throw new Error('Expense not found');
                } else {
                    throw new Error('Failed to update expense');
                }
            }
            return response.json();
        },
        onSuccess: (updatedExpense) => {
            queryClient.invalidateQueries(['expenses']); // This refetches the 'expenses' query
            dispatch(updateExpense(updatedExpense)); // Update Redux store if needed
            onCancel(); //closes the update option once user clicks update expense button
        },
        onError: (error) => {
            console.error(error); 
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedExpense = {
            ...expense,
            name,
            amount: parseFloat(amount),
        };
        mutation.mutate(updatedExpense); //triggers the mutation(update action) to send the updated expense to the backend.
    };

    useEffect(()=>{
        setName(expense.name);
        setAmount(expense.amount);
    }, [expense]);

    return(
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />
            <input
                type="text"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
            />
            <button type="submit">Update Expense</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default UpdateExpenseForm;
