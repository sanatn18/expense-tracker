import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
    name:'expenses',
    initialState: [],
    reducers: {
        addExpense: (state, action) => {
            state.push(action.payload)
        },
        removeExpense: (state, action) => {
            return state.filter((expense)=>expense.id !== action.payload)
        },
        updateExpense: (state, action) => {
            const index = state.findIndex((expense)=>expense.id === action.payload.id);
            if (index !== -1){
                state[index] = action.payload;
            }
        }
    }
})

export const { addExpense, removeExpense, updateExpense } = expenseSlice.actions;
export default expenseSlice.reducer;