import React from "react";
import classes from './Welcome.module.css'
import { Link, useNavigate } from "react-router-dom";

import { authActions } from "../Store/auth-slice";
import { useDispatch,useSelector } from "react-redux";
import {toggleTheme} from '../Store/themeSlice'

const Welcome=()=>{
   //const authCtx=useContext(AuthContext)
   const dispatch = useDispatch()
   
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
   const history=useNavigate()
   const isDarkThemeEnable = useSelector(
    (state) => state.theme.isDarkThemeEnable
  );
  // console.log("isDarkTheme",isTheme)

  const logoutHandler=()=>{
    dispatch(authActions.logout())
    //authCtx.logout();
    history("/")
  }
  const toggleHandler = () => {
    dispatch(toggleTheme({ isDarkTheme: true }));
  };

     return (<>
      <header className={classes.header}>
        <h1>Welcome to expense tarcker</h1>
       {isLoggedIn && <><button onClick={logoutHandler} className={classes.log}>logout</button>
        <div className={classes.com}>
        Your profile is incomplete.
          <Link to="/Profile">Complete now</Link>
        </div> </>}
        {isDarkThemeEnable && (
              <button className={classes.toggleBtn} onClick={toggleHandler}>
                <img  className={classes.icon} />
              </button>
            )}
      </header>
     </>)
    

}
export default Welcome