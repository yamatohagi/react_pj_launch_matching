import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function Result() {

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
          <AlertTitle >マッチング</AlertTitle>
          相手にメッセージを送ってみましょう — <strong>check it out!</strong>
        </Alert>
      </div>

      <div>Hello, </div>
    </div>
  );
}

export default Result;