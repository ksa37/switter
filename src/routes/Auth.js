import {authService} from "fbase";
import React from "react";
import {GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle, faGithub} from "@fortawesome/free-brands-svg-icons";

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
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm/>
            <div className="authBtns">
                <button name="googleBtn" onClick={onSocialClick} className="authBtn">
                    Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button name="githubBtn" onClick={onSocialClick} className="authBtn">
                    Continue with Github <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    )

}