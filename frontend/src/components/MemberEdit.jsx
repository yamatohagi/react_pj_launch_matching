import React, {useState} from "react";
import { updateMember } from "../api/memberApi";

export const MemberEdit = ({ member, handleEditButton }) => {
  console.log('iiiii');
  console.log(member);
  console.log('iiiii');
    const [name, setName] = useState(member.name);
    const [dept, setDept] = useState(member.dept);

    const handleSubmit = () => {
        try {
            updateMember(member.id, name, dept)
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson)
            });

          } catch {
            console.log("eroor")
          }
    }

    const handleNameChange = (event) => {
        setName(event.target.value)
    }
    const handleDeptChange = (event) => {
        setDept(event.target.value)
    }

    return (
    <form onSubmit={handleSubmit}>
        <label>
        Email: {member.mail}
        </label>
        <br/>
        <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br/>

        <label>
        Dept:
        <input type="text" value={dept} onChange={handleDeptChange} />
        </label>
        <br/>
        <input type="submit" value="Submit" />
    </form>
    );
}