import React from "react";
import Button from "react-bootstrap/Button";
/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */
export const ProfileData = ({ member, handleEditButton }) => {

    return (
        <div id="profile-div">
            <p><strong> Name: </strong> {member.name}</p>
            <p><strong>dept: </strong> {member.dept}</p>
            <p><strong>Email: </strong> {member.mail}</p>
            <p><strong>Id: </strong> {member.id}</p>
            <Button variant="secondary" onClick={handleEditButton()}>Edit</Button>
        </div>
    );
};