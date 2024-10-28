import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteExpense, getExpenses } from "../services/expenseService";
import { useDispatch } from "react-redux";
import AddExpenseForm from "../Components/AddExpenseForm.jsx"

const Dashboard = () => {

    const { data: expenses, isLoading, error } = useQuery({
        queryKey: ['expenses'], 
        queryFn: getExpenses,   // function to fetch expenses
    });

    //created the delete mutation here instead of a separate component like add and update
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    // const deleteMutation = useMutation(deleteExpense, {
    //     onSuccess: (deletedExpenseID) => {
    //         queryClient.invalidateQueries(['expenses']);
    //         dispatch(deleteExpense(deletedExpenseID));
    //     },
    // });

    const deleteMutation = useMutation({
        mutationFn: deleteExpense, // Explicitly set the function
        onSuccess: (deletedExpenseID) => {
            queryClient.invalidateQueries(['expenses']);
            dispatch(deleteExpense(deletedExpenseID));
        },
    });

    const handleDelete = (id) =>{
        deleteMutation.mutate(id);
    }


    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error Fetching Expenses</div>

    return(
        <div>
            <h1>Expense Tracker Dashboard</h1>
            <AddExpenseForm/>
            {expenses.length > 0 ? (
                <ul>
                    {expenses.map((expense) => (
                        <li key={expense.id}>
                            {expense.name} : ${expense.amount}
                            <button onClick={() => handleDelete(expense.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No expenses added yet.</p> // Display message if there are no expenses
            )}
        </div>
    )
}

export default Dashboard;