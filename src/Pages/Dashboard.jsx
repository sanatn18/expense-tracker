import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteExpense, getExpenses } from "../services/expenseService";
import { useDispatch } from "react-redux";
import AddExpenseForm from "../Components/AddExpenseForm.jsx"
import UpdateExpenseForm from "../Components/UpdateExpenseForm.jsx";
import { removeExpense } from "../redux/expensesSlice.js";
import LogoutButton from "../Components/LogoutButton.jsx";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const navigate = useNavigate();

    const [editingExpense, setEditingExpense] = useState(null); //to track the expense thats being edited

    // Authentication check function
    const isAuthenticated = () => !!localStorage.getItem('authToken');


    // Authentication and navigation effect
    useEffect(() => {
        // Redirect to login if not authenticated
        if (!isAuthenticated()) {
            window.history.replaceState(null, '', '/login');
            navigate('/login', { replace: true });
            return;
        }

        // Prevent accessing dashboard after logout
        const handlePopstate = () => {
            if (!isAuthenticated()) {
                window.history.replaceState(null, '', '/login');
                navigate('/login', { replace: true });
            }
        };

        // Add popstate event listener
        window.addEventListener('popstate', handlePopstate);

        // Cleanup
        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, [navigate]);


    const { data: expenses, isLoading, error } = useQuery({
        queryKey: ['expenses'], 
        queryFn: getExpenses,   // function to fetch expenses
        enabled: isAuthenticated() // Only fetch if authenticated
    });

    //to calculate the total expense
    const totalExpenses = useMemo(()=>{
        return expenses
            ? expenses.reduce((total, expense)=>total + parseFloat(expense.amount),0)
            : 0;
    }, [expenses]);

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
            dispatch(removeExpense(deletedExpenseID));
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

     // Additional authentication check
     if (!isAuthenticated()) {
        return null; // or redirect component
    }

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error Fetching Expenses</div>

    return (
        <div>
            <div>
                Total Expenses: ${totalExpenses.toFixed(2)}
            </div>
            <h1>Expense Tracker Dashboard</h1>
            <AddExpenseForm />
            <LogoutButton />
            {editingExpense ? (
                <div>
                    <h2>Update Expense</h2>
                    <UpdateExpenseForm expense={editingExpense} onCancel={handleCancelEdit} />
                </div>
            ) : (
                expenses && expenses.length > 0 ? ( // check if expenses is defined
                    <ul>
                        {expenses.map((expense) => (
                            <li key={expense._id}>
                                {expense.description} : ${expense.amount}
                                <button onClick={() => handleEdit(expense)}>Edit</button>
                                <button onClick={() => handleDelete(expense._id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No expenses added yet.</p>
                )
            )}
        </div>
    );
    
}

export default Dashboard;