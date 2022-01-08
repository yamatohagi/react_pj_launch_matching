import logo from "./logo.svg";
import "./App.css";
import { TextField, Button, Box, Fab, Stack, LinearProgress, ButtonGroup, Grid } from "@mui/material";
import * as React from "react";
import ReactDOM from "react-dom";

// import { AdapterDateFns, LocalizationProvider, DateTimePicker } from '@mui/lab';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigationIcon from "@mui/icons-material/Navigation";
import AcUnitIcon from "@mui/icons-material/AcUnit";

import Header from "./components/Header";

import PropTypes from "prop-types";
import ButtonUnstyled, { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";

function App() {
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

  ButtonRoot.propTypes = {
    children: PropTypes.node,
  };

  const CustomButtonRoot = styled(ButtonRoot)(
    ({ theme }) => `
    overflow: visible;
    cursor: pointer;
    --main-color: ${theme.palette.mode === "light" ? "rgb(25,118,210)" : "rgb(144,202,249)"};
    --hover-color: ${theme.palette.mode === "light" ? "rgba(25,118,210,0.04)" : "rgba(144,202,249,0.08)"};
    --active-color: ${theme.palette.mode === "light" ? "rgba(25,118,210,0.12)" : "rgba(144,202,249,0.24)"};

    & polygon {
      fill: transparent;
      transition: all 800ms ease;
      pointer-events: none;
    }

    & .bg {
      stroke: var(--main-color);
      stroke-width: 0.5;
      filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1));
      fill: transparent;
    }

    & .borderEffect {
      stroke: var(--main-color);
      stroke-width: 2;
      stroke-dasharray: 150 600;
      stroke-dashoffset: 150;
      fill: transparent;
    }

    &:hover,
    &.${buttonUnstyledClasses.focusVisible} {
      .borderEffect {
        stroke-dashoffset: -600;
      }

      .bg {
        fill: var(--hover-color);
      }
    }

    &:focus,
    &.${buttonUnstyledClasses.focusVisible} {
      outline: none;
    }

    &.${buttonUnstyledClasses.active} {
      & .bg {
        fill: var(--active-color);
        transition: fill 300ms ease-out;
      }
    }

    & foreignObject {
      pointer-events: none;

      & .content {
        font-family: Helvetica, Inter, Arial, sans-serif;
        font-size: 14px;
        font-weight: 200;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--main-color);
        text-transform: uppercase;
      }

      & svg {
        margin: 0 5px;
      }
    }`
  );

  const SvgButton = React.forwardRef(function SvgButton(props, ref) {
    return <ButtonUnstyled {...props} component={CustomButtonRoot} ref={ref} />;
  });

  const [value, setValue] = React.useState(new Date());

  const handleSubmit = (event) => {
    // event.preventDefault();
    // console.log(name);
    // console.log(pass);
    console.log("submit_SvgButton");
  };

  return (
    <form onSubmit={handleSubmit}>
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
                <TextField required id="mail-address" label="メールアドレス" variant="standard" />
              </div>
              <div style={{ height: 100 }}>
                <TextField required id="name" label="名前" variant="standard" />
              </div>
              <div style={{ height: 100 }}>
                <TextField required id="department-name" label="事業部" variant="standard" />
              </div>
              <div style={{ height: 100 }}>
                {/* <TextField required id="standard-required" label="希望日" variant="standard" /> */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
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
        <SvgButton
          onClick={() => {
            const body = JSON.stringify({ tomail: 'sinngohiura@gmail.com', limit: 'limit' });
            fetch("https://www.muryou-tools.com/program/postjson.php", {
              method: "POST",

              body: body,
              // =====↓追加====
              headers: { "Content-Type": "application/json" },
              // =====↑追加====
            }).then(() => {
              // 省略
            });

            alert("clicked");
          }}
        >
          Go!! lunch!!
        </SvgButton>
      </div>
    </form>
  );
}

export default App;
