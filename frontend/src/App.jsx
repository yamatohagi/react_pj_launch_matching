import React, { useState, useEffect } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "./util/authConfig";
import { PageLayout } from "./components/PageLayout";
import { ProfileData } from "./components/ProfileData";
import { callMsGraph } from "./api/graph";
import { MemberProfile } from "./pages/MemberProfile"
import { FullWidthTabs } from "./pages/Tabs"
import Button from "react-bootstrap/Button";
import Carousel from "./components/Carousel/Carousel"
import "./styles/App.css";
import ThemeConfig from './theme';

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);
    useEffect(() => {
        RequestProfileData()
    }, []);


    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        }).then((response) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response));
        });
    }

    return (
        <>
            {graphData ?
                <FullWidthTabs memberData={graphData}/>
                // <MemberProfile memberData={graphData}/>
                :
                <Button variant="secondary" onClick={RequestProfileData}>Request Profile Information</Button>
            }
        </>
    );
};

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <ProfileContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <Carousel/>
            </UnauthenticatedTemplate>
        </div>
    );
};

export default function App() {
    return (
      <ThemeConfig>
        <PageLayout>
            <MainContent />
        </PageLayout>
        </ThemeConfig>
    );
}
