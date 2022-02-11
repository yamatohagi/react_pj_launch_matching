import React, { useState, useEffect } from "react";
import { setGetMember } from "../api/memberApi";
import { newMatch, matchingEntryList } from "../api/matchApi";
import { ProfileData } from "../components/ProfileData";
import { MemberEdit } from "../components/MemberEdit";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { TextField, Button, Box, LinearProgress, Grid } from "@mui/material";
import MatchEntryList from "../components/MatchEntryList"

export const MemberProfile = ({memberData}) => {
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
      });
     
    } catch {
      console.log("eroor")
    }
    
  }, []);  

  useEffect(() => {
    if (partnerMember != null || partnerMember != undefined) {
      alert(Object.values(partnerMember))
    }
  }, [partnerMember])
  

  const handleEditButton = () => {
    setEditMember(!editMember)
  }

  const handleMatchTimeInsert = () => {
    console.log("1234")
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
  
  return (
    <>
    {
      member ? (
        
      <div style={{ height: 500 }}>

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



        <Button
          id="submit-button"
          variant="contained"
          color="primary"
          size="large"
          onClick={handleEntryListButton}
          >履歴</Button><br/><br/><br/>
          {
            matchEntry ? (
              <MatchEntryList matchEntry={matchEntry}/>
            ) : null
          }

        {
          editMember ? (
            <MemberEdit member={member} handleEditButton={()=> handleEditButton}/>
          ) : (
            <ProfileData member={member} handleEditButton={()=> handleEditButton}/>
          )
        }
      
    
        
        </div>
      )
      :
      <h5 className="card-title">WelcomeProfileData</h5>
    }
      
    </>
  )
    
}