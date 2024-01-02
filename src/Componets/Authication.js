import React, { useState, useContext } from "react";
import classes from './Authication.module.css';
import Input from "./UI/Input";
import AuthContext from "./Store/AuthContext";
import { useNavigate,Link } from "react-router-dom";

const Authication = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [login, setLogin] = useState(true);
  const history = useNavigate();
  const authCtx = useContext(AuthContext);

  const switchModeHandler = () => {
    setLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (inputEmail.trim().length > 0 && password.trim().length > 0) {
      let url;
      if (login) {
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-xCnBCx20ES2d4gAANKdQF_REddQ--dI";
      } else {
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-xCnBCx20ES2d4gAANKdQF_REddQ--dI";
      }

      try {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            email: inputEmail,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (response.ok) {
          const data = await response.json();
          authCtx.login(data.idToken);
          history("/Verifaction");
        } else {
          const data = await response.json();
          throw new Error(data.error.message);
        }
      } catch (error) {
        alert(`Authentication failed: ${error.message}`);
      }
    } else {
      alert("Please enter valid data");
    }

    setInputEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className={classes.box}>
      <div className={classes.auth}>
        <h1>{login ? "Login" : "Signup"}</h1>
        <form onSubmit={submitHandler} className={classes.form}>
          <Input
            type="email"
            placeholder="Email"
            className={classes.int}
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            className={classes.int}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!login && (
            <Input
              type="password"
              placeholder="Confirm Password"
              className={classes.int}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          <button>{login ? "Login" : "Signup"}</button>
          {login && <Link to="/ForgetPassword"> ForgetPassword</Link>}
        </form>
      </div>
      <button className={classes.btn} onClick={switchModeHandler}>
        {login ? "Don't have an account? Signup" : "Have an account? Login"}
      </button>
    </div>
  );
};

export default Authication;