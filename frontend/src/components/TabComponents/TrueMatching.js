import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function TrueMatching() {

  useEffect(() => {
    const scriptAlert = document.createElement("script");
    scriptAlert.type = "text/javascript";

    const head = document.getElementsByTagName("head")[0];
    head.appendChild(scriptAlert);
  }, []);

  return (
    <div className="App">
      <br></br>
      <div>
      <Alert variant="filled" severity="success">
        　マッチングしました！！！！　　
        履歴から相手を確認して、メッセージを送ってみましょう。
      </Alert>
      </div>

    </div>
  );
}

export default TrueMatching;
