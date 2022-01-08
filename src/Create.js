import logo from "./logo.svg";
import "./App.css";
import { TextField, Button, Box, Fab, Stack, LinearProgress, ButtonGroup, Grid } from "@mui/material";
import * as React from "react";
import ReactDOM from "react-dom";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

import Header from "./components/Header";


import page1 from "./components/page1"; //作成したpage1.jsを読み込んでいる
import { Link } from "react-router-dom";

function Create() {
  const ButtonRoot = React.forwardRef(function ButtonRoot(props, ref) {
    const { children, ...other } = props;

    return (
      <svg width="150" height="50" {...other} ref={ref}>
        <polygon points="0,50 0,0 150,0 150,50" className="bg" />
        <polygon points="0,50 0,0 150,0 150,50" className="borderEffect" />
        <foreignObject x="0" y="0" width="150" height="50">
          <div className="content">{children}</div>
        </foreignObject>
      </svg>
    );
  });

  const [value, setValue] = React.useState(new Date());

  return (
    <form>
      <div className="App">
        <Header />
        <Grid container direction="column">
          <Grid style={{ height: 100 }} item></Grid>
          <div class="demo demo7">
            <div class="heading">
              <span class="title">IBJ Launch Match</span>
              <span class="caption">ランチに行ける日を登録</span>
            </div>
          </div>
          <Grid item container>



            <Grid sm={2} />
            <Grid xs={12} sm={8}>
              <div style={{ height: 100 }}>
                <TextField required id="mail-address" name="mail" label="メールアドレス" variant="standard" />
              </div>
              <div style={{ height: 100 }}>
                <TextField required id="name" name="name" label="名前" variant="standard" />
              </div>
              <div style={{ height: 100 }}>
                <TextField required id="department-name" name="department-name" label="事業部" variant="standard" />
              </div>
              <div style={{ height: 100 }}>
                {/* <TextField required id="standard-required" label="希望日" variant="standard" /> */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => <TextField name="date-time" id="date-time" {...props} />}
                    label="開始時間(〜1時間)"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                  />
                </LocalizationProvider>
              </div>
            </Grid>
            <Grid sm={2} />
          </Grid>
        </Grid>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        ></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& > *": {
              m: 1,
            },
          }}
        ></Box>
        <Button
          onClick={() => {
            console.log(document.getElementById("name").value);
            const url = "https://jsonplaceholder.typicode.com/posts/";
            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                Name: document.getElementById("name").value,
                Mail: document.getElementById("mail-address").value,
                DepartmentName: document.getElementById("department-name").value,
                DateTime: document.getElementById("date-time").value,
              }),
            };
            fetch(url, requestOptions)
              .then((response) => response.json())
              .then((responseJson) => {
                console.log(responseJson);
                this.history.pushState(null, '/about');
              });
          }}
          variant="contained"
          color="primary"
          // type="submit"
        >
          Go!! lunch!!
        </Button>
        <Link to={`/about`}>Go To page2</Link>
      </div>
    </form>
  );
}

export default Create;
