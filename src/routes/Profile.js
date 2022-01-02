import { authService } from "fbase";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Profile(){
    const navigate = useNavigate();
    const onSignOutClick = () => {
        authService.signOut();
        navigate("/");
    };
    return(
        <>
            <button onClick={onSignOutClick}>Sign Out</button>
        </>
    )
}