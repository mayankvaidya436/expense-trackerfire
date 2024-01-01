import React,{useState} from "react";
const AuthContext=React.createContext({
    idToken:"",
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
}) 
 export const AuthContextProvider=(props)=>{
    const intitalToken=localStorage.getItem("token")
  const [token ,setToken]=useState(intitalToken)
  const userLoggedIn=!!token
   const loginHandler=(token)=>{
    
    setToken(token)
    localStorage.setItem("token" ,token)
   }
   const logoutHandler=()=>{
    setToken(null)
    localStorage.removeItem("token")
   }
   const contextValue={
    token:token,
    isLoggedIn:userLoggedIn,
    login:loginHandler,
    logoutHandler:logoutHandler
   }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}
export default AuthContext