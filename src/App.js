import Authication from "./Componets/Authication";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import './App.css';
import React,{useEffect} from "react";

 import Profile from "./Componets/Pages/Profile";
import Root from "./Componets/Pages/Root";
import Verifaction from "./Componets/Pages/Verifaction";
import ForgetPassword from "./Componets/Pages/ForgetPassword";
import { useSelector } from "react-redux";
import classes from './new.module.css'
function App() {
 // const authCtx=useContext(AuthContext)
  const isLoggedIn =  useSelector((state)=>state.auth.isLoggedIn)
console.log("APPP",isLoggedIn)
const isTheme = useSelector((state)=>state.theme.isDarkTheme)
useEffect(() => {
  document.body.classList.toggle(classes.dark, isTheme);
  return () => {
    document.body.classList.remove(classes.dark);
  };
}, [isTheme]);

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={!isLoggedIn ? <Authication/> : <Root/>} />
      <Route path="/ForgetPassword" element={<ForgetPassword/>}/>
      <Route path='/Verifaction' element={<Verifaction/>}/>
      <Route path='/Profile' element={<Profile/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
