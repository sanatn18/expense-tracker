import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
    name:'expenses',
    initialState: [],
    reducers: {
        addExpense: (state, action) => {
            state.push(action.payload)
        },
        removeExpense: (state, action) => {
            return state.filter((expense)=>expense._id !== action.payload)
        },
        updateExpense: (state, action) => {
            const index = state.findIndex((expense)=>expense.id === action.payload.id);
            if (index !== -1){
                state[index] = action.payload;
            }
        },
        reset: () => []
    }
})

export const { addExpense, removeExpense, updateExpense, reset } = expenseSlice.actions;
export default expenseSlice.reducer;