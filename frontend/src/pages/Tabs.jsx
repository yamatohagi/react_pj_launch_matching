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
import CustomizedTables from "../components/TabComponents/CustomizedTables";

import DivisionView from "../components/TabComponents/DivisionView";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ja from "date-fns/locale/ja";
// material
import { TextField, Button, Box, LinearProgress, Grid, Container, Card } from "@mui/material";
// ステファンコード
import { setGetMember } from "../api/memberApi";
import { newMatch, matchingEntryList } from "../api/matchApi";
import { ProfileData } from "../components/ProfileData";
import { MemberEdit } from "../components/MemberEdit";
import MatchEntryList from "../components/MatchEntryList";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";


export const FullWidthTabs = ({ memberData }) => {


  const [member, setMember] = useState(null);
  const [partnerMember, setPartnerMember] = useState(null);
  const [matchEntry, setMatchEntry] = useState(null);
  const [editMember, setEditMember] = useState(false);
  const [matchTime, setMatchTime] = useState(new Date());

  const [tab_count, setTabCount] = useState(0);
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    setTabCount(props.value)
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
console.log(tab_count);
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };


  useEffect(() => {
    try {
      setGetMember(memberData["displayName"], memberData["mail"])
        .then((response) => response.json())
        .then((responseJson) => {
          setMember(responseJson);
          matchingEntryList(responseJson["id"])
            .then((response) => response.json())
            .then((responseJson) => {
              console.log('loadした時');
              setMatchEntry(responseJson);
            });
        });
    } catch {
      console.log("eroor");
    }
  }, [tab_count]);

  useEffect(() => {
    if (partnerMember != null || partnerMember != undefined) {
      if (Object.values(partnerMember)[0] == false) {
        setResultCount(2);
      } else if (Object.values(partnerMember)[0] == true) {
      }
    }
  }, [partnerMember]);

  const handleEditButton = () => {
    setEditMember(!editMember);
  };

  const handleMatchTimeInsert = () => {
    try {
      newMatch(member.id, matchTime)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log('登録ボタン');
          console.log(responseJson);
          setPartnerMember(responseJson);
        });
    } catch {
      console.log("eroor");
    }
  };

  const handleEntryListButton = () => {
    matchingEntryList(member.id)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setMatchEntry(responseJson);
      });
  };

  const [result_count, setResultCount] = useState(0);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
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
            <Card sx="margin-bottom: 20%;margin-top: 6%;padding: 90px 6%;">
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
              {result_count === 2 ? <NotMatching /> : ""}
              {result_count === 1 ? <TrueMatching /> : ""}
            </Card>
          </Container>
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          {matchEntry ? <MatchEntryList matchEntry={matchEntry} /> : null}
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
    </Box>
  );
};
