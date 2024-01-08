import React from "react";
import classes from './Welcome.module.css'
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Store/AuthContext";
import { authActions } from "../Store/auth-slice";
import { useDispatch } from "react-redux";
const Welcome=()=>{
   //const authCtx=useContext(AuthContext)
   const dispatch = useDispatch()
   const history=useNavigate()
  const logoutHandler=()=>{
    dispatch(authActions.logout())
    //authCtx.logout();
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