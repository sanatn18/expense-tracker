let expenses = [];

// export const getExpenses = async() =>{
//     return new Promise((resolve)=>{
//         setTimeout(()=>{
//             resolve(expenses);
//         }, 1000); //1sec delay to mimic an api call.
//     })
// }

export const getExpenses = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...expenses]); // Returning a copy of expenses to avoid direct mutation issues
        }, 1000);
    });
};

// export const addNewExpense = async(expense) => {
//     return new Promise((resolve)=>{
//         setTimeout(()=>{
//             expenses.push(expense);
//             resolve(expense);
//         }, 1000);
//     })
// }

export const addNewExpense = async (expense) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            expenses.push(expense); // Add expense to the array
            resolve(expense); // Resolve with the newly added expense
            console.log("New Expense Added:", expense); 
            console.log("Current Expenses:", expenses); 
        }, 1000);
    });
};

export const deleteExpense = async(id) =>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            expenses = expenses.filter((expense)=> expense.id !== id);
            resolve(id);
        },500);
    })
}

export const updateExpenseAPI = async(updatedExpense) =>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            expenses = expenses.map((expense)=>
                expense.id === updatedExpense.id ? updatedExpense : expense
        );
        resolve(updatedExpense);
        },500);
    })
}
