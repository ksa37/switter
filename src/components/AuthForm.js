import { authService } from "fbase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

export default function AuthForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {target:{name, value}} = event;
        switch(name){
            case("email"): {
                setEmail(value);
                break;
            }case("password"): {
                setPassword(value);
                break;
            }
        }
        // console.log(event.target.name);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            let data;
            if(newAccount){
                data = await createUserWithEmailAndPassword(authService, email, password);
            }else{
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);
        }catch(error){
            setError(error.message);
        }
    }
    const toggleAccount = () => setNewAccount((prev) => !prev);

    return(
        <>
            <form onSubmit={onSubmit}>
                <input 
                    name="email"
                    type="email" 
                    placeholder="Email" 
                    required 
                    value={email}
                    onChange={onChange}
                />
                <input 
                    name="password"
                    type="password" 
                    placeholder="Password" 
                    required  
                    value={password}
                    onChange={onChange}
                />
                <input type="submit" value={newAccount? "Create Account":"Sign In"}/>
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </span> 
        </>
    )
}