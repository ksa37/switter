import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import { useState } from "react";

export default function AppRouter(){
    const [isLoggedIn, setLoggedIn] = useState(false);
    return(
        <Router>
            <Routes>
                {isLoggedIn
                ?<Route exact path="/" element={<Home/>}></Route>
                :<Route exact path="/" element={<Auth/>}></Route>
                }
            </Routes>
        </Router>
    )
}