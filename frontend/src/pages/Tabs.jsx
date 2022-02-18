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
import { TextField, Button, Box, LinearProgress, Grid } from "@mui/material";
import DivisionView from "../components/TabComponents/DivisionView";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DateInput from "../components/TabComponents/DateInput";

// ステファンコード
import { setGetMember } from "../api/memberApi";
import { newMatch, matchingEntryList } from "../api/matchApi";
import { ProfileData } from "../components/ProfileData";
import { MemberEdit } from "../components/MemberEdit";
import MatchEntryList from "../components/MatchEntryList"
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';








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

export const FullWidthTabs = ({memberData}) => {
  // ＝＝＝＝＝＝＝＝
  // ステファンコード
  // ＝＝＝＝＝＝＝＝

  const [member, setMember] = useState(null);
  const [partnerMember, setPartnerMember] = useState(null);
  const [matchEntry, setMatchEntry] = useState(null);
  const [editMember, setEditMember] = useState(false);
  const [matchTime, setMatchTime] = useState(new Date());

  useEffect(() => {
    try {
      setGetMember(memberData['displayName'],memberData['mail'])
      .then((response) => response.json())
      .then((responseJson) => {
        setMember(responseJson)
        matchingEntryList(responseJson['id'])
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          setMatchEntry(responseJson)
        });
      });

    } catch {
      console.log("eroor")
    }

  }, []);

  useEffect(() => {//これは？？？変わったタイミングで走る？
    if (partnerMember != null || partnerMember != undefined) {
      if (Object.values(partnerMember)[0] == false) {
        setResultCount(2)
      }else if(Object.values(partnerMember)[0] == true){

      }

    }

  }, [partnerMember])


  const handleEditButton = () => {
    setEditMember(!editMember)
  }

  const handleMatchTimeInsert = () => {
    console.log("122222334")
    try {
      newMatch(member.id, matchTime)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        setPartnerMember(responseJson)
      });
    } catch {
      console.log("eroor")
    }
  }

  const handleEntryListButton = () => {
    matchingEntryList(member.id)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          setMatchEntry(responseJson)
        });
  }

  // ＝＝＝＝＝＝＝＝
  // ステファンコード
  // ＝＝＝＝＝＝＝＝

  const [result_count, setResultCount] = useState(0);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const division_set = {
    id: 1,
    name: 'null'
  };

  const [division, setDivision] = useState(division_set);

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const init_rows = [
    createData('骨皮　bbbスネ夫', '2022/02/05', 0),
    createData('ドラえもん', '2022/02/03', 0),
    createData('さいたま', '2022/02/06', 0),
    createData('社長', '2022/02/06', 0),

  ];

  const [rows, setRows] = useState(init_rows);

  const divisionChange = (input) => {


    setDivision({
      id: 1,
      name: input
    })
  };

  const dateInput = (input) => {
    setRows([
      createData('dddddssssddd', '2022/02/05', 0),
      createData('ドラえもん', '2022/02/03', 0),
      createData('さいたま', '2022/02/06', 0),
      createData('社長', '2022/02/06', 0),
    ])
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  function hogeFunc(response) {
    setCount(1)
    //レスポンスをここでゴニョゴニョ
    const match_result = true
    if (match_result == true) {


    }
    var str = JSON.stringify(response);
    alert(str)
    // this.setState({ hoge: '変えたぞ' });
  }

  return (
    <Box sx={{ bgcolor: "background.paper"}}>
      {/* <Header/> */}
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} indicatorColor="secondary" textColor="inherit" variant="fullWidth" aria-label="full width tabs example">
          <Tab icon={<StarBorderIcon />} label="ランチに行ける日を登録" />
          <Tab icon={<FavoriteIcon />} iconPosition="end" label="履歴" />
          <Tab icon={<PersonPinIcon />} iconPosition="bottom" label="基本情報" />
        </Tabs>
      </AppBar>
      <SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={value} onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <br/><br/>
          {result_count === 2 ? <NotMatching /> : ""}
          {result_count === 1 ? <TrueMatching /> : ""}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              renderInput={(props) => <TextField name="date-time" id="date-time" {...props} />}
              label="開始時間(〜1時間)"
              value={matchTime}
              onChange={(newValue) => {
                setMatchTime(newValue);
              }}
            />
          </LocalizationProvider><br/><br/><br/>
          <Button
            id="submit-button"
            variant="contained"
            color="primary"
            size="large"
            onClick={handleMatchTimeInsert}
            >登録</Button><br/><br/><br/>
          {/* ステファンコード End*/}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>


          {
            matchEntry ? (
              <MatchEntryList matchEntry={matchEntry}/>
            ) : null
          }
          {/* ステファンコード End*/}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          {/* <DivisionView value={division} function={(input) => { divisionChange(input) }}/> */}
          {/* ステファンコード Start*/}

          <br/><br/>
          {
            editMember ? (
              <MemberEdit member={member} handleEditButton={()=> handleEditButton}/>
            ) : (
              <ProfileData member={member} handleEditButton={()=> handleEditButton}/>
            )
          }
          {/* ステファンコード End*/}
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
