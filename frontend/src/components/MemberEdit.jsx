import React, { useState } from "react";
import { updateMember } from "../api/memberApi";
import { Card, Button, Box, TextField } from "@mui/material";

export const MemberEdit = ({ member, handleEditButton }) => {
  console.log("iiiii");
  console.log(member);
  console.log("iiiii");
  const [name, setName] = useState(member.name);
  const [dept, setDept] = useState(member.dept);

  const handleSubmit = () => {
    try {
      updateMember(member.id, name, dept)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
        });
    } catch {
      console.log("eroor");
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleDeptChange = (event) => {
    setDept(event.target.value);
  };

  return (
    <Card sx="margin-bottom: 20%;margin-top: 6%;padding: 20px 6%;">
      <form onSubmit={handleSubmit}>
        <Box sx={{ py: 5 }}>
          <Box sx={{ py: 2, textAlign: "center" }}>
            <TextField defaultValue={name} style={{ width: 260 }} id="name_edit" name="name" label="名前" variant="standard" onChange={handleNameChange} />
          </Box>
          <Box sx={{ py: 2, textAlign: "center" }}>
            <TextField defaultValue={dept} style={{ width: 260 }} id="dept_edit" name="dept" label="事業部" variant="standard" onChange={handleDeptChange} />
          </Box>
        </Box>

        <Box sx={{ p: 2, textAlign: "center" }}>
          <Button sx="margin-bottom: 10%;" type="submit" id="submit-button" variant="contained" color="primary" size="large" onClick={handleSubmit}>
            登録
          </Button>
        </Box>
      </form>
    </Card>
  );
};
