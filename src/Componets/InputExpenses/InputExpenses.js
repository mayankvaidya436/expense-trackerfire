import React,{useState} from "react";
import Input from "../UI/Input";
import classes from './InputExpenses.module.css'
const InputExpenses=(props)=>{
const  [price, setPrice]=useState();
const  [desc,setDesc]=useState();
const  [category, setCategory]=useState();

const handleFormSubmit=(event)=>{
  event.preventDefault();
  const expensedata={
    price,
    description:desc,
    category
  };
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
                <option value="petrol">Petrol</option>
                <option value="fule">Fule</option>
                <option value="cloths">Cloths</option>
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