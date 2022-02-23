import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function TrueMatching() {

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
        <Alert sx={{ padding: 5,margin: 3,textAlign: 'center' }} severity="success">
          <AlertTitle >マッチング</AlertTitle>
          相手にメッセージを送ってみましょう — <strong>check it out!</strong>
        </Alert>
      </div>
      <br></br>
    </div>
  );
}

export default TrueMatching;
