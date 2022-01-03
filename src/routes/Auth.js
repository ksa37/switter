import {authService} from "fbase";
import React from "react";
import {GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import AuthForm from "components/AuthForm";

export default function Auth(){
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
            <AuthForm/>
            <div>
                <button name="googleBtn" onClick={onSocialClick}>Continue with Google</button>
                <button name="githubBtn" onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    )

}