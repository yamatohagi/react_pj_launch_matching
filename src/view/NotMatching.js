import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

function NotMatching() {
  const { response } = useLocation();
  console.log(response);
  var str = JSON.stringify(response);
  useEffect(() => {
    const scriptAlert = document.createElement("script");
    scriptAlert.type = "text/javascript";

    // const textAlert = document.createTextNode(`console.log('hello!')`);
    // scriptAlert.appendChild(textAlert);

    const head = document.getElementsByTagName("head")[0];
    head.appendChild(scriptAlert);
  }, []);

  return (
    <div className="App">
      <br></br>
      <div>
        <Alert sx={{ borderRadius: 1, mx: "auto", width: 400,textAlign: 'center', }} severity="success">
          <AlertTitle >登録しました。</AlertTitle>
          確認する — <strong>check it out!</strong>
        </Alert>
      </div>

      <div>Hello, {str}</div>
    </div>
  );
}

export default NotMatching;
