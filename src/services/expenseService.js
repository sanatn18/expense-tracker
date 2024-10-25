let expenses = [
    { id:1, name:"Shopping", amount: 5000},
    { id:2, name:"Party", amount:3000},
];

export const getExpenses = async() =>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(expenses);
        }, 1000); //1sec delay to mimic an api call.
    })
}

export const addNewExpense = async(expense) => {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            expenses.push(expense);
            resolve(expense);
        }, 1000);
    })
}

export const deleteExpense = async(expense) =>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            expense.filter((expense)=> expense.id !== id);
            resolve(id);
        },500);
    })
}

export const updateExpense = async(updatedExpense) =>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            expenses = expenses.map((expense)=>
                expense.id === updateExpense.id ? updatedExpense : expense
        );
        resolve(updatedExpense);
        },500);
    })
}
