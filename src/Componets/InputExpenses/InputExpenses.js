import React,{useState,useContext,useEffect} from "react";
import Input from "../UI/Input";
import classes from './InputExpenses.module.css'
import AuthContext from "../Store/AuthContext";
import EditExpenseContext from "../Store/EditExpenseContext";
const InputExpenses=(props)=>{
  const [id,setId]=useState(null)
const  [price, setPrice]=useState();
const  [desc,setDes]=useState();
const  [category, setCategory]=useState();
 
const authCtx=useContext(AuthContext)
console.log(authCtx);

const removedAt = authCtx.email.replace(/[@.]/g,"");
  const sanitizedEmail = removedAt.replace(/[@.]/g,"");

  const EditCtx=useContext(EditExpenseContext)

  useEffect(() => {
    setId(EditCtx.id);
    setPrice(EditCtx.price);
    setDes(EditCtx.description);
    setCategory(EditCtx.category);
  }, [EditCtx.id, EditCtx.price, EditCtx.description, EditCtx.category]);

  async function editData(id, updatedData) {
    const response = await fetch(
      `https://expense-tracker-7d7d2-default-rtdb.firebaseio.com/expense${sanitizedEmail}.json`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    if (!data || Object.keys(data).length === 0) {
      console.log('No items to update');
      return;
    }

    let itemIdToUpdate;
    for (const key in data) {
      if (typeof data[key] === 'object') {
        if (data[key].expensedata.id === id) {
          itemIdToUpdate = key;
          break;
        }
      }
    }

    console.log("upID", itemIdToUpdate);

    if (itemIdToUpdate) {
      const updateResponse = await fetch(
        `https://expense-tracker-7d7d2-default-rtdb.firebaseio.com/expense${sanitizedEmail}/${itemIdToUpdate}.json`,
        {
          method: "PUT",
          body: JSON.stringify({ expensedata: updatedData }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const updateData = await updateResponse.json();

      if (updateData) {
        EditCtx.setUpdatedData(true);
        console.log("PUT Successful");
      } else {
        console.log("PUT Failed");
      }
    } else {
      console.log("Item not found for update");
    }
  }

const handleFormSubmit=async(event)=>{
  event.preventDefault();
  const expensedata={
    id:Date.now(),
    price,
    description:desc,
    category
  };

  if (id) {
    await editData(id, expensedata);
  }  else{

const response=await fetch(`https://expenses-217b7-default-rtdb.firebaseio.com/expense${sanitizedEmail}.json`,{
    method:'POST',
    body:JSON.stringify({expensedata}),
    headers:{
        "Content-type":"application/json"
    }
  })
  const data=await response.json()
  console.log("D",data)
  if (response.ok) {
    console.log("POST Successful");
  }
}



  props.addExpenses(expensedata)
  console.log(expensedata)
  setCategory('')
  setDes('')
  setPrice('')
  setId(null)

}
    return (<> 
    <form className={classes.main} onSubmit={handleFormSubmit}>
        <div className={classes.body}>

            <div className={classes.input}>
                <Input type="number" label="price" onChange={(e)=>{setPrice(e.target.value)}} value={price}/>
            </div>
            <div className={classes.input}>
                <Input type="text" label="description" onChange={(e)=>{setDes(e.target.value)}} value={desc}/>
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
        {id?"update":" add expense"}
      </button>
    </form>
     
    </>)
}
export default InputExpenses;