import React,{useContext,useState} from "react";
import classes from './Verfication.module.css'
import Input from "../UI/Input";
import AuthContext from "../Store/AuthContext";
import {  useNavigate } from "react-router-dom";
const Verifaction=()=>{
    const authCtx=useContext(AuthContext)
    const [email,setEmail]=useState("")
    const [isLoggedIn,setIsloggedIn]=useState(false)
    const history=useNavigate()
    const switchHandler=()=>{
        setIsloggedIn(authCtx.isLoggedIn)
    }
    const submitHandler=async(event)=>{
      event.preventDefault();
      const response=fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB-xCnBCx20ES2d4gAANKdQF_REddQ--dI',{
        method:'POST',
        body:JSON.stringify({
            requestType:"VERIFY EMAIL",
            idToken:authCtx.token,
        }),
        headers:{
            'Content-Type': 'application/json'
        }
      })
      const data=await response.json()
      if(data.email===email)
      {
        history("/Welcome")
      }
      if(!data.ok)
      {
        throw new Error("verfication failed" ,data.error.message)
      }

    }
    return (<>
  {!isLoggedIn && <button onClick={switchHandler}>Verify Email Id</button>}
    {isLoggedIn && <form onSubmit={submitHandler} className={classes.main}>
        <div className={classes.int}>
            <Input type="email" placeholder="email" className={classes.input} 
            onChange={(e)=>{setEmail(e.target.value)}} value={email}
            />
        </div>
        <button className={classes.btn}>Verify</button>
     </form>}
    </>)
}
export default Verifaction