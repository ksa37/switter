import { authService } from "fbase";
import { updateProfile } from "firebase/auth";
import { getDocs } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile({refreshUser, userObj}){
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const navigate = useNavigate();
    const onSignOutClick = () => {
        authService.signOut();
        navigate("/");
    };

    const onChange = (event) => {
        const {target: {value}} = event;
        setNewDisplayName(value);
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            await updateProfile(authService.currentUser,{
                displayName: newDisplayName
            });
            refreshUser();
        }

    }
    return(
        <>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Display name" value={newDisplayName} onChange={onChange}/>
                <input type="submit" value="Update Profile"/>
            </form>
            <button onClick={onSignOutClick}>Sign Out</button>
        </>
    )
}