import React,{useState,useContext} from "react";
import  classes from './Authication.module.css'
import Input from "./UI/Input";

import AuthContext from "./Store/AuthContext";
import { useNavigate } from "react-router-dom";
const Authication=()=>{
    
 const [inputEmail ,setInputEmail]=useState("")
 const [password ,setPassword]=useState("")
 const [confirmPassword,setConfirmPassword]=useState("")
 const [login ,setlogin]=useState(false)
 const history=useNavigate()
 const authCtx=useContext(AuthContext)
  const switchModeHandler=()=>{
   setlogin((prestate)=>!prestate)
  }
 const SubmitHandler=async(event)=>{
  event.preventDefault()
  
  if(inputEmail.length>0 && password)
  {
    if(password)
    {
        let URL;
        if(login)
        {
           URL ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBC-k92hZtHMzRiGvhb1ReIWizoFNa0Q7w"
        }
        else{
    URL="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBC-k92hZtHMzRiGvhb1ReIWizoFNa0Q7w"
        }
    }
    
     try{   
     const respnse=await fetch(URL,{
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
        console.log("d",data.idToken);
            authCtx.login(data.idToken)
            history("/");
        
    }
    else{
        const data=await respnse.json()
        throw new Error(data.error.message)
    }
    
    } catch(error){
        alert(`Authication failed ${error.message}`)
    }

  }
  else{
    alert("plzz enter vaild data")
  }
  setInputEmail('')
  setPassword('')
  setConfirmPassword('')
 }
  return (<div className={classes.box}>
    <div className={classes.auth} >
         <h1>{login? "login" :"signup" }</h1>
        <form onSubmit={SubmitHandler} className={classes.form}>
            <Input type="email" placeholder="email" 
            className={classes.int} value={inputEmail}
             onChange={(e)=>{setInputEmail(e.target.value)}}/>

            <Input type="password" placeholder="password"
             className={classes.int} value={password}
              onChange={(e)=>{setPassword(e.target.value)}}/>

           {!login && <Input type="password" placeholder="conform"
             className={classes.int} value={confirmPassword} 
             onChange={(e)=>{setConfirmPassword(e.target.value)}}/>}

      <button>{login ?" login" : "Signup"}</button>
        </form>
        
    </div>
    <button className={classes.btn}
     onClick={switchModeHandler}  >{login?  "Dont have an acount? signup":"Have an account? Login"}</button>
  </div>)
}
export default Authication;