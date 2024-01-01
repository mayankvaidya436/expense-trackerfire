import React,{useState} from "react";
import classes from './Welcome.module.css'
import { Link } from "react-router-dom";
const Welcome=()=>{
     return (<>
      <header className={classes.header}>
        <h1>Welcome to expense tarcker</h1>
        <div className={classes.com}>
        Your profile is incomplete.
          <Link to="/Profile">Complete now</Link>
        </div>
      </header>
     </>)
    

}
export default Welcome