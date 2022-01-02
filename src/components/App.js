import AppRouter from "./Router";
import React, {useEffect, useState} from "react";
import {authService} from "fbase";
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user)=>{
      if(user){
        setLoggedIn(true);
        setUserObj(user);
      }else{
        setLoggedIn(false);
      }
      setInit(true);
    })
  }, [])

  return (
    <>
    {init? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}></AppRouter> :"Initializing..."}
    <footer>&copy; {new Date().getFullYear()} Switter</footer>
    </>
  )
}

export default App;
