import React, { useEffect, useState } from "react";
import { TextField, Button, Box, LinearProgress, Grid } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

function DateInput(props) {
  const [value, setValue] = useState("hello");

  console.log(props.value);
  return (
    <div className="App">
      <br></br>
      <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
        id="date-picker"
          label="Basic example"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      </div>
      <br></br>

      <br></br>
      <Button
        id="submit-button"
        variant="contained"
        color="primary"
        size="large"
        onClick={() => {
          props.function();

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
        登録
      </Button>
    </div>
  );
}

export default DateInput;
