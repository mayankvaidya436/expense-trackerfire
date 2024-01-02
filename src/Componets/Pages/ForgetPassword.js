import React,{useState} from "react";
import classes from './ForgetPassword.module.css'
import Input from "../UI/Input";
import { useNavigate } from "react-router-dom";
const ForgetPassword=()=>{
    const [inputEmail,setInputEmail]=useState("");
    const [isLoading,setIsLoading]=useState(false)
    const history=useNavigate();

    const submitHandler=async(event)=>{
        event.preventDefault();
        setIsLoading(true)
  try { 
    const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB-xCnBCx20ES2d4gAANKdQF_REddQ--dI',{
        method:'POST',
        body:JSON.stringify({
         email:inputEmail,
         requestType:"PASSWORD_RESET",
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    const data=await response.json();
    if(response.ok)
    {    setIsLoading(false)
        
        history('/')
    }
    else{
        console.error(data.error)
    }
    
  } catch (error) {
    console.error(error)
  }
    }
    return (<>
      <div className={classes.main}>
        <div className={classes.body} >
            <form onSubmit={submitHandler} className={classes.form}>
                <Input type="email" placeholder="email" 
                 onChange={(e)=>{setInputEmail(e.target.value)}} value={inputEmail}  className={classes.int}
                />
                <button className={classes.btn} disabled={isLoading}> {isLoading ? "sending...":"send Link"}</button>
            </form>
        </div>
      </div>
    </>)
}
export default ForgetPassword