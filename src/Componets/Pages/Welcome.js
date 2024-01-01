import React,{useState} from "react";
import classes from './Welcome.module.css'
import Input from "../UI/Input";
const Welcome=()=>{
    const [isComplete,setIsComplete]=useState(false)
    const [fullName, setFullName]=useState("")
    const [photo,setPhoto]=useState("")
    const switchHandler=()=>{
        setIsComplete((prestate)=>!prestate)
    }
    const submitHandler=async(event)=>{
      event.preventDefault();
      try {
       const respnse=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBC-k92hZtHMzRiGvhb1ReIWizoFNa0Q7w',{
            method:"POST",
            body:JSON.stringify({
                displayName:fullName,
                photoUrl:photo,
                returnSecureToken:true
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        
        
            const data=await respnse.json()
          console.log(data)
        
      } catch (error) {
        console.error("submiting error", error)
      }
      setFullName('')
      setPhoto('')
    }
    return (
        <> 
        <header className={classes.header}>
            {isComplete?"Winners never quit, Quitters never win":"Welcome to Expense Tracker!!!"}
        <div className={classes.com}>
            { isComplete ?"compelte profile":"your profile is incomplete"}
            <button className={classes.btn} onClick={switchHandler}> complete now</button>

             </div>
        </header>
      {isComplete &&  <form  onSubmit={submitHandler}
        className={classes.main}>
            <h3>contact details</h3>
           <div className={classes.int}>
            <Input label="Full Name" type="text" value={fullName} className={classes.input}
            onChange={(e)=>{setFullName(e.target.value)}}/>
           </div>
           <div className={classes.int}>
            <Input label="Profile Photo" type="text" value={photo} className={classes.input}
            onChange={(e)=>{setPhoto(e.target.value)}}/>
           </div>
           <button>update</button>

        </form>}
        
        </>
    )
}
export default Welcome