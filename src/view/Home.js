import React, { useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import Create from "../view/Create";
import Result from "../view/Result";
import NotMatching from "../view/NotMatching";
import CustomizedTables from "./CustomizedTables";

import DivisionView from "../view/DivisionView";
import Header from "../components/Header";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DateInput from "./DateInput";

function TabPanel(props) {
  const { children, value, index, ...other } = props;




  const state = {
    loading: false,
    view_status: 'result'
  };
  const [values, setState] = useState(state);





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

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}




export default function FullWidthTabs() {
  const [count, setCount] = useState(2);
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
    createData('骨皮　スネ夫', '2022/02/05', 0),
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
      createData('dddd', '2022/02/05', 0),
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
    <Box sx={{ bgcolor: "background.paper", width: 1000 }}>
      <Header/>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} indicatorColor="secondary" textColor="inherit" variant="fullWidth" aria-label="full width tabs example">
          <Tab icon={<StarBorderIcon />} label="ランチに行ける日を登録" />
          <Tab icon={<FavoriteIcon />} iconPosition="end" label="履歴" />
          <Tab icon={<PersonPinIcon />} iconPosition="bottom" label="基本情報" />
        </Tabs>
      </AppBar>
      <SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={value} onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0} dir={theme.direction}>
          {/* <Create datahoge={(input) => { hogeFunc(input) }}/> */}
          <DateInput function={() => { dateInput() }}/>
          {count === 1 ? <Result /> : ""}
          {count === 2 ? <NotMatching /> : ""}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <CustomizedTables value={rows}/>



        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>

        <DivisionView value={division} function={(input) => { divisionChange(input) }}/>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
