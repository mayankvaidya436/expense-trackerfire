import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import expensesSlice from "./expense-slice";
const store = configureStore({
    reducer: {
      auth: authSlice.reducer,     
      expense: expensesSlice.reducer 
    },
  });
  
  export default store;