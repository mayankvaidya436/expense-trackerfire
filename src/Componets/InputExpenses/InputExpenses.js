import React,{useState,useContext} from "react";
import Input from "../UI/Input";
import classes from './InputExpenses.module.css'
import AuthContext from "../Store/AuthContext";
const InputExpenses=(props)=>{
const  [price, setPrice]=useState();
const  [desc,setDesc]=useState();
const  [category, setCategory]=useState();
 
const authCtx=useContext(AuthContext)
const removedAt = authCtx.email.replace('@', '');
const sanitizedEmail = removedAt.replace('.', '');

const handleFormSubmit=async(event)=>{
  event.preventDefault();
  const expensedata={
    id:Date.now(),
    price,
    description:desc,
    category
  };

  const response=await fetch(`https://expenses-217b7-default-rtdb.firebaseio.com/expense${sanitizedEmail}.json`,{
    method:'POST',
    body:JSON.stringify({expensedata}),
    headers:{
        "Content-type":"application/json"
    }
  })
  const data=await response.json()
  console.log("D",data)
  if(data.ok)
  {
    console.log("post succesful")
  }



  props.addExpenses(expensedata)
  console.log(expensedata)
  setCategory('')
  setDesc('')
  setPrice('')

}
    return (<> 
    <form className={classes.main} onSubmit={handleFormSubmit}>
        <div className={classes.body}>

            <div className={classes.input}>
                <Input type="number" label="price" onChange={(e)=>{setPrice(e.target.value)}} value={price}/>
            </div>
            <div className={classes.input}>
                <Input type="text" label="description" onChange={(e)=>{setDesc(e.target.value)}} value={desc}/>
            </div>
            <div className={classes.input}>
            <label className={classes.label} htmlFor="expenseCategory">Expense Category :</label>
            <select id="expensecategory"
             value={category}
             onChange={(e)=>{setCategory(e.target.value)}}
             className={classes.input}
             >
                <option value="movie">Movie</option>
                <option value="electronic">Electronic</option>
                <option value="Recharge">Recharge</option>
            </select>

            </div>
        </div>
        <button type="submit" className={classes.btn}>
        Add Expense
      </button>
    </form>
     
    </>)
}
export default InputExpenses;