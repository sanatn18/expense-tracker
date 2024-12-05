import axios from 'axios';

export const getExpenses = async () => {
  const token = localStorage.getItem('token'); //store the JWT in localStorage
  const response = await fetch('http://localhost:5000/api/expenses', {
    headers: {
      Authorization: `Bearer ${token}`, // Add Authorization header
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch expenses');
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
    const token = localStorage.getItem('authToken'); //store the token in localstorage
    if (!token) {
        throw new Error('No authentication token found');
    }

    try {
        const response = await axios.post(
            'http://localhost:5000/api/expenses',
            expense,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error in addNewExpense:", error.response?.data || error.message);
        throw new Error("Failed to add expense");
    } 
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
