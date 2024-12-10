import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateExpense } from "../redux/expensesSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "../styles/UpdateExpenseForm.css"

const UpdateExpenseForm = ({expense, onCancel}) => {
    const [description, setDescription] = useState(expense.description);
    const [amount, setAmount] = useState(expense.amount);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (updatedExpense) => {
            const token = localStorage.getItem('authToken');

            const response = await fetch(`http://localhost:5000/api/expenses/${updatedExpense._id}`, {  // use the backend port here
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',// indicates that the request body will be in JSON format since the backend expects JSON data for correct parsing.
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    description: updatedExpense.description,
                    amount: updatedExpense.amount,
                    date: updatedExpense.date
                }),
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
            console.error('Update Expense Error:', error); 
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!description || !description.toString().trim()) {
            window.alert("Description can't be empty");
            return;
        }

        // first we convert the amount to string to use trim() since it doesnt work on numbers
        const amountStr = amount.toString();
        if (!amountStr.trim()) {
            window.alert("Amount can't be empty");
            return;
        }

        const isConfirmed = window.confirm("Are you sure you want to update?");
        if (!isConfirmed) return;
        
        const updatedExpense = {
            ...expense,
            description,
            amount: parseFloat(amount),
        };
        mutation.mutate(updatedExpense); //triggers the mutation(update action) to send the updated expense to the backend.
    };

    useEffect(()=>{
        setDescription(expense.description);
        setAmount(expense.amount);
    }, [expense]);

    return(
        <div className="update-expense-container">
            <div className="update-expense-form-wrapper">
                <h2>Update Expense</h2>
        <form onSubmit={handleSubmit}>
            <input
                className="update-expense-input"
                type="text"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
            />
            <input
                className="update-expense-input"
                type="number"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
            />
            <div className="update-expense-button-wrapper">
            <button 
                className="update-expense-button" 
                type="submit">
                    Update 
            </button>
            
            <button 
                className="cancel-button"
                type="button" 
                onClick={onCancel}>
                    Cancel
            </button>
            </div>
        </form>
        </div>
        </div>
    );
};

export default UpdateExpenseForm;
