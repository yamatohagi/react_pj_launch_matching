import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../util/authConfig";
import Button from 'react-bootstrap/Button';

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 */
export const SignInButton = () => {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginRedirect(loginRequest)
            .catch(e => {
                console.log(e);
            });     }
    return (
        <>
            <button className={'appbtn'} onClick={() => handleLogin()}>
                 <span>ログイン</span> 
            </button>
        </>
    )
}