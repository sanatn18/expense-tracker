import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteExpense, getExpenses } from "../services/expenseService";
import { useDispatch } from "react-redux";
import AddExpenseForm from "../Components/AddExpenseForm.jsx"
import UpdateExpenseForm from "../Components/UpdateExpenseForm.jsx";
import { removeExpense } from "../redux/expensesSlice.js";
import LogoutButton from "../Components/LogoutButton.jsx";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from 'lucide-react'; 
import '../styles/Dashboard.css'

const CURRENCY_SYMBOLS = {
    'USD': '$',
    'INR': '₹',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥'
};

const Dashboard = () => {
    const navigate = useNavigate();

    const [editingExpense, setEditingExpense] = useState(null); //to track the expense thats being edited
    const [selectedCurrency, setSelectedCurrency] = useState(() => {
        return localStorage.getItem('selectedCurrency') || 'INR';
    });

    const isAuthenticated = () => !!localStorage.getItem('authToken');

    // authentication and navigation effect
    useEffect(() => {
        // redirect to login if not authenticated
        if (!isAuthenticated()) {
            window.history.replaceState(null, '', '/login');
            navigate('/login', { replace: true });
            return;
        }

        // prevent the user from accessing dashboard after logout
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

    const deleteMutation = useMutation({
        mutationFn: deleteExpense, // Explicitly set the function
        onSuccess: (deletedExpenseID) => {
            queryClient.invalidateQueries(['expenses']);
            dispatch(removeExpense(deletedExpenseID));
        },
    });

    const handleDelete = (id) =>{
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (confirmDelete) {
            deleteMutation.mutate(id);
        }
    }

    const handleEdit = (expense) => { //set the expense to be edited
        setEditingExpense(expense);
    }

    const handleCancelEdit = () =>{ //clear the editing state
        setEditingExpense(null);
    }

    const handleCurrencyChange = (event) => {
        const newCurrency = event.target.value;
            setSelectedCurrency(newCurrency);
            localStorage.setItem('selectedCurrency', newCurrency);// Save the selected currency to localStorage
    }       
     // Additional authentication check
     if (!isAuthenticated()) {
        return null; // or redirect component
    }
    

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error Fetching Expenses</div>

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
            <div className="total-expenses">
                Total Expenses: {CURRENCY_SYMBOLS[selectedCurrency]}{totalExpenses.toFixed(2)}
            </div>
            <div className="currency-selector">
                    <label htmlFor="currency-select">Currency: </label>
                    <select 
                        id="currency-select" 
                        value={selectedCurrency} 
                        onChange={handleCurrencyChange}
                    >
                        {Object.keys(CURRENCY_SYMBOLS).map(currency => (
                            <option key={currency} value={currency}>
                                {currency} ({CURRENCY_SYMBOLS[currency]})
                            </option>
                        ))}
                    </select>
                </div>
            <LogoutButton />
            </div>

            <h1>Expense Tracker Dashboard</h1>
            {!editingExpense && (
                <div className="dashboard-content">
                    <AddExpenseForm />
                </div>
            )}

            {editingExpense ? (
                <div>
                    <UpdateExpenseForm expense={editingExpense} onCancel={handleCancelEdit} />
                </div>
            ) : (
                expenses && expenses.length > 0 ? ( // check if expenses is defined
                    <table className="expenses-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((expense) => (
                                <tr key={expense._id}>
                                    <td data-label="Description">{expense.description}</td>
                                    <td data-label="Amount">
                                    {CURRENCY_SYMBOLS[selectedCurrency]}{expense.amount}
                                    </td>
                                    <td data-label="Actions">
                                        <div className="action-icons">
                                            <Pencil 
                                                className="edit-icon" 
                                                size={20} 
                                                onClick={() => handleEdit(expense)}
                                                title="Edit Expense"
                                            />
                                            <Trash2 
                                                className="delete-icon" 
                                                size={20} 
                                                onClick={() => handleDelete(expense._id)}
                                                title="Delete Expense"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="no-expenses">
                        <p>No expenses added yet.</p>
                    </div>
                )
            )}
        </div>
    );
    
}

export default Dashboard;