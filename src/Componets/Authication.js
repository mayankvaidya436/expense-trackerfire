import React,{useState} from "react";
import  classes from './Authication.module.css'
import Input from "./UI/Input";
const Authication=()=>{
 const [inputEmail ,setInputEmail]=useState("")
 const [password ,setPassword]=useState("")
 const [confirmPassword,setConfirmPassword]=useState("")

 const SubmitHandler=async(event)=>{
  event.preventDefault()
  
  if(inputEmail && password && confirmPassword)
  {
    if(password !== confirmPassword)
    {
        alert("plzz check password")
    }
    else{
     try{   
     const respnse=await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=YOUR_API_KEY",{
        method:'POST',
        body:JSON.stringify({
           email:inputEmail,
           password:password,
           returnSecureToken: true,
        }),
        headers:{
            "Content-Type": "application/json",
        }
    })
    if(respnse.ok)
    {
        const data=await respnse.json()
        console.log(data)
    }
    
    } catch(error){
        console.log("error" ,error.message)
    }
}
  }
 }
  return (<div className={classes.box}>
    <div className={classes.auth} >
        <h1>Signup </h1>
        <form onSubmit={SubmitHandler} className={classes.form}>
            <Input type="email" placeholder="email" 
            className={classes.int} value={inputEmail}
             onChange={(e)=>{setInputEmail(e.target.value)}}/>

            <Input type="password" placeholder="password"
             className={classes.int} value={password}
              onChange={(e)=>{setPassword(e.target.value)}}/>

            <Input type="password" placeholder="conform"
             className={classes.int} value={confirmPassword} 
             onChange={(e)=>{setConfirmPassword(e.target.value)}}/>

      <button>Signup</button>
        </form>
        
    </div>
    <button className={classes.btn}>Have an account? Login</button>
  </div>)
}
export default Authication;