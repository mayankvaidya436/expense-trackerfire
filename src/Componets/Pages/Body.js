import React,{useState} from "react";
import InputExpenses from "../InputExpenses/InputExpenses";
import OutputExpenses from "../OutputExpenses/OutputExpenses";
const Body=()=>{
    const [expenses,setExpenses]=useState([])
    const AddExpenseHandler=(newExpense)=>{
   
        const newExpenseWithId = {
            ...newExpense,
            id: `expense-${expenses.length + 1}`,
          };
      
          setExpenses((prevExpenses) => [newExpenseWithId, ...prevExpenses]);
    }

    console.log("expenses", expenses);
    
    return (<div>
        <InputExpenses addExpenses={AddExpenseHandler}/>
        <OutputExpenses expenses={expenses}/>
    </div>)
}
export default Body