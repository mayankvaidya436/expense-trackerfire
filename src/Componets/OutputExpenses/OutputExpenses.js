import React from "react";
import classes from './OutputExpenses.module.css'
const OutputExpenses=({expenses})=>{
  return (
    <div className={classes.main}>
  <h2 className={classes.header}> Expnse list</h2>
  {expenses.length===0 ? <p>no expnse add yet</p>:
  (
    <ul>
          {expenses.map((expense) => (
            <li key={expense.id} className={classes.li}>
              <p><strong>{expense.description}</strong></p> - <p>${expense.price}</p> <p>({expense.category})</p>
            </li>
          ))}
        </ul>
  )}
     
    </div>
  )
}
export default OutputExpenses
