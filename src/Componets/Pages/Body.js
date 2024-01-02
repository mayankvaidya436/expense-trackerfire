import React,{useState,useContext,useEffect} from "react";
import InputExpenses from "../InputExpenses/InputExpenses";
import OutputExpenses from "../OutputExpenses/OutputExpenses";
import AuthContext from "../Store/AuthContext";
const Body=()=>{
    const [expenses,setExpenses]=useState([])

    const authCtx=useContext(AuthContext)
    const removedAt = authCtx.email.replace('@', '');
    const sanitizedEmail = removedAt.replace('.', '');
    const AddExpenseHandler=(newExpense)=>{
   
        const newExpenseWithId = {
            ...newExpense,
            
          };
      
          setExpenses((prevExpenses) => [...prevExpenses,newExpenseWithId]);
    }

    console.log("expenses", expenses);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(
              `https://expenses-217b7-default-rtdb.firebaseio.com/expense${sanitizedEmail}.json'`
            );
    
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
    
            const data = await response.json();
    
            if (data) {
              const fetchedExpenses = Object.keys(data).map((key) => {
                const expenseData = data[key].expenseData;
                return {
                  id: expenseData.id,
                  category: expenseData.category,
                  description: expenseData.description,
                  price: expenseData.price,
                };
              });
    
              setExpenses(fetchedExpenses);
            }
          } catch (error) {
            console.error('Error fetching data:', error.message);
          }
        };
    
        fetchData();
      }, [sanitizedEmail]);

    return (<div>
        <InputExpenses addExpenses={AddExpenseHandler}/>
        <OutputExpenses expenses={expenses}/>
    </div>)
}
export default Body

