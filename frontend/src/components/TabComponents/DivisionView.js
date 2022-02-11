
import React, { useEffect, useState } from "react";
import { TextField, Button, Box, LinearProgress, Grid } from "@mui/material";

function DivisionView(props) {

  useEffect(() => {
    const scriptAlert = document.createElement("script");
    scriptAlert.type = "text/javascript";

    // const textAlert = document.createTextNode(`console.log('hello!')`);
    // scriptAlert.appendChild(textAlert);




    const head = document.getElementsByTagName("head")[0];
    head.appendChild(scriptAlert);
  }, []);
  const [value, setValue] = useState('hello');


console.log(props.value);
  return (
    <div className="App">
      <br></br>
      <div>
      <TextField
                  defaultValue={value}
                  required
                  style={{ width: 260 }}
                  id="name_edit"
                  name="name"
                  label="事業部"
                  variant="standard"
                />
      </div>
      <br></br>
      <label>{props.value['name']}</label>
      <br></br>
      <Button
          id="submit-button"
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            props.function(document.getElementById('name_edit').value)
            setValue(props.value['name'])
            // if (true) {
            //   document.getElementById("submit-button").style.visibility = "hidden";
            //   document.getElementById("load-status").style.visibility = "visible";
            //   const url = "https://jsonplaceholder.typicode.com/posts/";
            //   const requestOptions = {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({
            //       Name: document.getElementById("name").value,
            //       Mail: document.getElementById("mail-address").value,
            //     }),
            //   };
            //   fetch(url, requestOptions)
            //     .then((response) => response.json())
            //     .then((responseJson) => {
            //       // setResponse(responseJson);
            //     });
            // } else {
            // }
          }}
        >
          変更
        </Button>
    </div>
  );
}

export default DivisionView;
