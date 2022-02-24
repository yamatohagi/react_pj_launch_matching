import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import TrueMatching from "../components/TabComponents/TrueMatching";
import NotMatching from "../components/TabComponents/NotMatching";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ja from "date-fns/locale/ja";
// material
import { TextField, Button, Box, LinearProgress, Grid, Container, Card } from "@mui/material";
import { setGetMember } from "../api/memberApi";
import { newMatch, matchingEntryList, deleteMatch } from "../api/matchApi";
import { ProfileData } from "../components/ProfileData";
import { MemberEdit } from "../components/MemberEdit";
import MatchEntryList from "../components/MatchEntryList";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';


export const FullWidthTabs = ({ memberData }) => {


  const [member, setMember] = useState(null);
  const [partnerMember, setPartnerMember] = useState(null);
  const [matchEntry, setMatchEntry] = useState(null);
  const [editMember, setEditMember] = useState(false);
  const [matchTime, setMatchTime] = useState(new Date());
  const [matched, setMatched] = useState(false)
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };


  useEffect(() => {
    initializedata()
  }, [value]);

  const initializedata = () => {
    try {
      setGetMember(memberData["displayName"], memberData["mail"])
        .then((response) => response.json())
        .then((responseJson) => {
          setMember(responseJson);
          if(value == 1){
            matchingEntryList(responseJson["id"])
              .then((response) => response.json())
              .then((responseJson) => {
                setMatchEntry(responseJson);
              });
          }
        });
        if(value != 0){
          setPartnerMember(null);
        };
    } catch {
      console.log("eroor");
    }
  }

  const handleEditButton = () => {
    setEditMember(!editMember);
  };

  const handleMatchTimeInsert = () => {
    try {
      newMatch(member.id, matchTime)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log('登録ボタン');
          console.log(responseJson["match_success"]);
          setPartnerMember(responseJson);
          setMatched(responseJson["match_success"])
        });
    } catch {
      console.log("eroor");
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const deleteMatchEntry = (id, status) => {
    console.log(status)
    if (status == '済'){
      setOpen(true)
    } else {
      try {
        deleteMatch(id)
          .then((response) => response.json())
          .then(() => {
            initializedata()
          });
      } catch {
        console.log("eroor");
      }
    }
    
  }

  const handleClose = () => {
    setOpen(false)
  };

  return (
    <Box>
      <AppBar position="static" style={{ background: "#444", color: ""  }}>
        <Tabs value={value} onChange={handleChange} indicatorColor="secondary" textColor="inherit" variant="fullWidth" aria-label="full width tabs example">
          <Tab icon={<StarBorderIcon />} label="日にち登録" />
          <Tab icon={<FavoriteIcon />}  label="マッチ履歴" />
          <Tab icon={<PersonPinIcon />}  label="基本情報" />
        </Tabs>
      </AppBar>

      <SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={value} onChangeIndex={handleChangeIndex}>

        <TabPanel value={value} index={0} dir={theme.direction}>
          <Container>
            <Card sx={"margin-bottom: 20%;margin-top: 6%;padding: 90px 6%;"}>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
                <DesktopDatePicker
                  renderInput={(props) => <TextField name="date-time" id="date-time" {...props} />}
                  label="日にち"
                  value={matchTime}
                  onChange={(newValue) => {
                    setMatchTime(newValue);
                  }}
                />
              </LocalizationProvider>
              <br />
              <br />
              <br />
              <br />
              <Button id="submit-button" variant="contained" color="primary" size="large" onClick={handleMatchTimeInsert}>
                登録
              </Button>
              <br />
              <br />
              <br />
              <br />
              {
                partnerMember != null || partnerMember != undefined ?
                  (matched ? <TrueMatching partnerMember={partnerMember}/> : <NotMatching />) : null
              }
            </Card>
          </Container>
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          {matchEntry ? <MatchEntryList matchEntry={matchEntry} deleteMatchEntry={(id, status) => deleteMatchEntry(id, status)}/> : null}
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
          <Container>
              {editMember ? (
                <MemberEdit member={member} handleEditButton={() => handleEditButton} />
              ) : (
                <ProfileData member={member} handleEditButton={() => handleEditButton} />
              )}
          </Container>
        </TabPanel>
      </SwipeableViews>
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={Slide}
        message="マッチ済なので削除できません"
        key={Slide.name}
      />
    </Box>
  );
};
