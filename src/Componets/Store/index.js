import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import expensesSlice from "./expense-slice";
import themeSlice from "./themeSlice";
const store = configureStore({
    reducer: {
      auth: authSlice.reducer,     
      expense: expensesSlice.reducer ,
      theme: themeSlice.reducer
    },
  });
  
  export default store;