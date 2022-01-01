import { authService, fbaseInstance} from "fbase";
import React, {useState} from "react";
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function Auth(){
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
    const onSocialClick = async (event) => {
        const {target:{name}} = event;
        let provider;
        switch(name){
            case("googleBtn"):{
                provider = new GoogleAuthProvider();
                break;
            }
            case("githubBtn"):{
                provider = new GithubAuthProvider();
                break;
            }
        }
        await signInWithPopup(authService, provider);
    }
    return(
        <div>
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
            <div>
                <button name="googleBtn" onClick={onSocialClick}>Continue with Google</button>
                <button name="githubBtn" onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    )

}