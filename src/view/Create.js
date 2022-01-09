import * as React from "react";
import "../App.css";
import { TextField, Button, Box, LinearProgress, Grid } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import ButtonUnstyled, { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import Header from "../components/Header";
import { Link, useHistory } from "react-router-dom";
import CustomButtonRoot from "../components/CustomButtonRoot";

function Create() {
  const history = useHistory();
  const onClickSection = (responseJson) => history.push({ pathname: "/result", state: responseJson });

  const [value, setValue] = React.useState(new Date());

  const SvgButton = React.forwardRef(function SvgButton(props, ref) {
    return <ButtonUnstyled {...props} component={CustomButtonRoot} ref={ref} />;
  });

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
        <Box id="load-status" style={{ visibility: "hidden" }} sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
        <br></br>
        <SvgButton
          type="submit"
          id="submit-button"
          onClick={() => {
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
              });
          }}
        >
          Go!! lunch!!
        </SvgButton>
        <br></br>
      </div>
    </form>
  );
}
export default Create;
