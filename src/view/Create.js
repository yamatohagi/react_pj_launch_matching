import React, { useState } from "react";
import "../App.css";
import { TextField, Button, Box, LinearProgress, Grid } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Header from "../components/Header";
import { Link, useHistory } from "react-router-dom";
import Result from "../view/Result";
import { createStore } from "redux";
import { Provider } from "react-redux"
import store from '../store/index'
import { useSelector } from "react-redux";
import { testFunctionA } from "../store/ActionCreator";


import Validation from "../components/Validation";

const Create = (props) => {


  const count1 = useSelector((state) => state.count);
  const mapStateToProps = (count1) => {
    return {
    }
  }
  // dispatch(testFunctionA());
  const history = useHistory();
  // const onClickSection = (responseJson) => history.push({ pathname: "/result", state: responseJson });
  const onClickSection = (responseJson) => props.datahoge(responseJson);

  const [value, setValue] = React.useState(new Date());


  const [response, setResponse] = useState();


  function clickButton() {
    return props();
  }

  const state = {
    info: {
      email: "",
      name: "",
    },
    message: {
      email: "",
      name: "",
    },
    loading: false,
  };
  const [values, setState] = useState(state);

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    const { info, message } = values;

    setState({
      info: { ...info, [key]: value },
      message: { ...message, [key]: Validation.formValidate(key, value) },
      loading: false,
    });
  };
  const canSubmit = () => {
    const validInfo =
      Object.values(values.info).filter((value) => {
        return value === "";
      }).length === 0;
    const validMessage =
      Object.values(values.message).filter((value) => {
        return value !== "";
      }).length === 0;
    return validInfo && validMessage && !values.loading;
  };

  return (
    <form>
      <div className="App">
        <Grid container direction="column">
          <Grid style={{ height: 100 }} item></Grid>
          <div class="demo demo7">
            <div class="heading">
              <span class="title">IBJ Launch Match</span>
              <span class="caption">登録</span>
            </div>
          </div>
          <Grid item container>
            <Grid sm={2} />
            <Grid xs={12} sm={8}>
              <div style={{ height: 100 }}>
                <TextField
                  error={values.message.name}
                  helperText={values.message.name}
                  value={values.info.name}
                  onChange={(event) => handleChange(event)}
                  required
                  style={{ width: 260 }}
                  id="name"
                  name="name"
                  label="名前   (山田 太郎)"
                  variant="standard"
                />
              </div>
              <div style={{ height: 100 }}>
                <TextField style={{ width: 260 }} required id="department-name" name="department-name" label="事業部" variant="standard" />
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
        <Box id="load-status" style={{ visibility: "hidden" }} sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
        <br></br>
        <Button
          id="submit-button"
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            if (canSubmit()) {
              document.getElementById("submit-button").style.visibility = "hidden";
              document.getElementById("load-status").style.visibility = "visible";
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
                  onClickSection(responseJson);
                  setResponse(responseJson);
                });
            } else {
            }
          }}
        >
          Go!! lunch!!
        </Button>

        <div>Countコンポーネント:{count1}</div>
        <br></br>
      </div>
    </form>
  );
}
export default Create;
