import React,{useEffect} from "react";
import classes from './OutputExpenses.module.css'
import EditExpenseContext from "../Store/EditExpenseContext";
import { useSelector,useDispatch } from "react-redux";
import { expenseAction } from "../Store/expense-slice";
const OutputExpense = () => {
  // Use useSelector to get expenses from Redux store
  const dispatch = useDispatch()
  const email = useSelector((state)=>state.auth.userId)
  const reRenderValue = useSelector(state => state.expense.reRender);
  console.log("reRenderFetch",reRenderValue)
  const removedAt = email.replace('@', '');
  const sanitizedEmail = removedAt.replace('.', ''); 
  const expenses = useSelector((state) => state.expense.expenses);

  const fetchData = async () => {
    const response = await fetch(`https://expense-tracker-7d7d2-default-rtdb.firebaseio.com/expense${sanitizedEmail}.json`,
    {
      method:"GET",
      "Content-Ttpe":"appliciation/json"
    })
     const data = await response.json()
    console.log("OUTPUTDATA",data)
    for(const key in data){
      if(data.hasOwnProperty(key)){
        const newData = data[key].expenseData
        console.log("newData",newData)
    dispatch(expenseAction.addExpense(newData))
      }
    }
  };

  useEffect(()=>{
    console.log("Effect is running!");
    fetchData()
  },[reRenderValue])
  // console.log("Output Expenses", expenses);
  // const expenses = [{id:1,description:"CAKE",price:220,category:"FOOD"}];
  const totalAmount = expenses.reduce((accumulator, expense) => {
    return accumulator + Number(expense.price);
  }, 0);



      const editHandler = (expense) => {
        dispatch(expenseAction.editExpenses(expense))
        // console.log("iiidd",expense.id)
        dispatch(expenseAction.removeExpense(expense.id));
      };
      const deleteHandler = (expenseID) => {
          // console.log("delete", expenseID);
    updateData(expenseID)
    dispatch(expenseAction.removeExpense(expenseID));

  };
  async function updateData(id) {
    const response = await fetch(`https://expense-tracker-7d7d2-default-rtdb.firebaseio.com/expense${sanitizedEmail}.json`, {
      method: "GET",
    });

    const data = await response.json();
    // console.log("update", data);
    if (!data || Object.keys(data).length === 0) {
      console.log('No items to update');
      return;
    }
    let itemIdUpdatedata;
    for (const key in data) {
      if (typeof data[key] === 'object') {
        if (data[key].expenseData.id === id) {
          itemIdUpdatedata = key;
          break;
        }
      }
    }
    console.log("upID", itemIdUpdatedata);
    const res = await fetch(`https://expense-tracker-7d7d2-default-rtdb.firebaseio.com/expense${sanitizedEmail}/${itemIdUpdatedata}.json`,
    {
      method:"DELETE",
    })

  if (res.ok) {
    alert('Item deleted successfully');
    // setReRender(true)
  } else {
    console.error('Failed to delete item');
  }




  }
    console.log("AK",expenses)

      

  return (<>
    <div className={classes.main}>
  <h2 className={classes.header}> Expnse list</h2>
  {expenses.length===0 ? <p>no expnse add yet</p>:
  (
    <ul className={classes.ul}>
    {expenses.map((expense) => (
      <li key={expense.id} className={classes.li}>
        <div className={classes.box}>{expense.description}</div> 
        <div className={classes.boxs}><p>{expense.price}₹</p>
       <p>{expense.category} </p></div>
       <div className={classes.buttons}>
                <button onClick={()=>editHandler(expense)} className={classes.edit}>Edit</button>
                <button onClick={() => deleteHandler(expense.id)} className={classes.delete}>Delete</button>
               </div>
      </li>
    ))}
  </ul>
  )}
     
    </div>
     <span className={classes.sidebar}>
     <h3 className={classes.sideHeading}>Total Amount</h3>
     {/* Display the calculated totalAmount */}
     <h1 className={classes.totalAmount}> {totalAmount}₹</h1>
     {totalAmount > 10000 && <button className={classes.newBtn}>Active Premium</button>}
   </span>
   </>
  )
}
export default OutputExpense
