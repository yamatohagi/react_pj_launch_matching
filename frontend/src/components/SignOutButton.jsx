import React from "react";
import { useMsal } from "@azure/msal-react";
import { Button } from "@mui/material";

/**
 * Renders a sign-out button
 */
export const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = () => {
        instance.logoutRedirect({
            postLogoutRedirectUri: "/",
        });
        
    }
    return (
        <>
        <Button variant="contained" color="primary" size="large" className="ml-auto" onClick={() => handleLogout()}>
            ログアウト
        </Button>
        </>
    )
}