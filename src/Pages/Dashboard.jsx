import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteExpense, getExpenses } from "../services/expenseService";
import { useDispatch } from "react-redux";
import AddExpenseForm from "../Components/AddExpenseForm.jsx"
import UpdateExpenseForm from "../Components/UpdateExpenseForm.jsx";


const Dashboard = () => {

    const [editingExpense, setEditingExpense] = useState(null); //to track the expense thats being edited

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

    const handleEdit = (expense) => { //set the expense to be edited
        setEditingExpense(expense);
    }

    const handleCancelEdit = () =>{ //clear the editing state
        setEditingExpense(null);
    }

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error Fetching Expenses</div>

    return(
        <div>
            <h1>Expense Tracker Dashboard</h1>
            <AddExpenseForm/>
            {editingExpense ? (
                <div>
                    <h2>Update Expense</h2>
                    <UpdateExpenseForm expense={editingExpense} onCancel={handleCancelEdit}/>
                </div>
            ): null}
            {expenses.length > 0 ? (
                <ul>
                    {expenses.map((expense) => (
                        <li key={expense.id}>
                            {expense.name} : ${expense.amount}
                            <button onClick={()=>handleEdit(expense)}>Edit</button>
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