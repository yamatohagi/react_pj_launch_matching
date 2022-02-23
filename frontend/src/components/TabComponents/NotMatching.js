import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function NotMatching() {
  useEffect(() => {
    const scriptAlert = document.createElement("script");
    scriptAlert.type = "text/javascript";

    const head = document.getElementsByTagName("head")[0];
    head.appendChild(scriptAlert);
  }, []);

  return (
    <div className="App">
      <div>
      <Alert variant="filled" severity="info">
        登録しました。
      </Alert>
      </div>
      <br></br>
    </div>
  );
}

export default NotMatching;
