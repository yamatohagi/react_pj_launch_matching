/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React from "react";
import Navbar from "react-bootstrap/Navbar";

import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import Logo from '../assets/logo.png';

/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * @param props
 */
export const PageLayout = (props) => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <>
            { isAuthenticated ?
                <>
                    <Navbar bg="primary" variant="dark">
                        <a className="navbar-brand" href="/">
                            <img src={Logo} height="40"/>
                            {`　IBJ昼マッチ`}
                        </a>
                        <SignOutButton />
                    </Navbar>
                </>
            : null }

            {props.children}
        </>
    );
};
