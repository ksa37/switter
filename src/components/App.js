import AppRouter from "./Router";
import React, {useEffect, useState} from "react";
import {authService} from "fbase";
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user)=>{
      if(user){
        setLoggedIn(true);
      }else{
        setLoggedIn(false);
      }
      setInit(true);
    })
  }, [])

  return (
    <>
    {init? <AppRouter isLoggedIn={isLoggedIn}></AppRouter> :"Initializing..."}
    <footer>&copy; {new Date().getFullYear()} Switter</footer>
    </>
  )
}

export default App;
