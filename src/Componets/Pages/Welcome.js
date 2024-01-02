import React,{useContext} from "react";
import classes from './Welcome.module.css'
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Store/AuthContext";
const Welcome=()=>{
   const authCtx=useContext(AuthContext)
   const history=useNavigate()
  const logoutHandler=()=>{
    authCtx.logout();
    history("/")
  }
     return (<>
      <header className={classes.header}>
        <h1>Welcome to expense tarcker</h1>
        <button onClick={logoutHandler} className={classes.log}>logout</button>
        <div className={classes.com}>
        Your profile is incomplete.
          <Link to="/Profile">Complete now</Link>
        </div>
      </header>
     </>)
    

}
export default Welcome