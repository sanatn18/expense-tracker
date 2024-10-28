import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateExpense } from "../redux/expensesSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExpenseAPI } from '../services/expenseService';

const UpdateExpenseForm = ({expense}) => {
    const [name, setName] = useState(expense.name);
    const [amount, setAmount] = useState(expense.amount);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();


    const mutation = useMutation(updateExpenseAPI, {     //we’re providing an onSuccess callback that runs if the API request completes
        onSuccess: (updatedExpense) => {                 //onSuccess receives updatedExpense as its argument. This updatedExpense represents the response returned by updateExpenseAPI 
            queryClient.invalidateQueries(['expenses']); 
            dispatch(updateExpense(updatedExpense));     //by dispatching this action, we update the local redux state with the updated expense data,
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
        </form>
    );
};

export default UpdateExpenseForm;
