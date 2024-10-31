// let expenses = [];

// export const getExpenses = async() =>{
//     return new Promise((resolve)=>{
//         setTimeout(()=>{
//             resolve(expenses);
//         }, 1000); //1sec delay to mimic an api call.
//     })
// }

export const getExpenses = async () => {
    const response = await fetch('http://localhost:5000/api/expenses')
    if (!response.ok){
        throw new Error("Failed to fetch expense");
    }
    return response.json();
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
    const response = await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(expense)
    });
    if (!response.ok) {
        throw new Error("Failed to add expense");
    }
    return response.json(); // returns the newly created expense from the backend
};

export const deleteExpense = async (id) => {
    const response = await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error("Failed to delete expense");
    }
    return id; // returning id as resolved value after successful delete
};

export const updateExpenseAPI = async(updatedExpense) =>{
    const response = await fetch(`http://localhost:5000/api/expenses/${updatedExpense.id}`,{
        method:'PUT',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(updatedExpense)

    });
    if (!response.ok){
        throw new Error("Failed to update expense");
    }
    return response.json(); //will return the updated expense from backend.
}
