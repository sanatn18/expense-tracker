import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../services/expenseService";

const Dashboard = () => {

    const { data: expenses, isLoading, error } = useQuery({
        queryKey: ['expenses'], 
        queryFn: getExpenses,   // function to fetch expenses
      });

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error Fetching Expenses</div>

    return(
        <div>
            <h1>Expense Tracker Dashboard</h1>
            <ul>
                {expenses.map((expense)=> (
                    <li key={expense.id}>
                        {expense.name} : ${expense.amount}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Dashboard;