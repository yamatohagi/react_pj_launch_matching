import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import MailIcon from '@mui/icons-material/Mail';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';

export const TrueMatching = ({ partnerMember }) => {

  const dateFormat = (lunch_date) => {
    const options = {
      month: "short",
      day: "numeric",
      weekday: "short",
    };
    const date = new Date(lunch_date);
    return date.toLocaleDateString("ja-JP", options);
  };

  useEffect(() => {
    const scriptAlert = document.createElement("script");
    scriptAlert.type = "text/javascript";

    const head = document.getElementsByTagName("head")[0];
    head.appendChild(scriptAlert);
  }, []);
  console.log(partnerMember);

  return (
    <div className="App">
      <br></br>
      <div>
      <Alert variant="filled" severity="success" >
        マッチング！！<br></br>
        {dateFormat(partnerMember.match_date)}「{partnerMember.partner_name}」さん<br></br>
        <MailIcon fontSize="small"/>&nbsp;:&nbsp;{partnerMember.partner_mail}<br></br>
        <HomeRepairServiceIcon fontSize="small"/>&nbsp;:&nbsp;{partnerMember.partner_dept}<br></br>
        メッセージを送ってみましょう。
      </Alert>
      </div>

    </div>
  );
}

export default TrueMatching;
