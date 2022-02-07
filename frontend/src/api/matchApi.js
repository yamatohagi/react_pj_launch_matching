import React, { useState, useEffect } from "react";
import { getCookie } from "../util/cookie";

export const newMatch = (id, matchTime) => {
  const url = "http://127.0.0.1:8000/api/new-match/";
  
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", 'X-CSRFToken': getCookie('csrftoken') },
    body: JSON.stringify({
      member_id: id,
      expected_date: matchTime
    }),
  };
  
   return fetch(url, requestOptions)
}

export const matchingEntryList = (memberId) => {
  const url = `http://127.0.0.1:8000/api/member-match-list/${memberId}/`;
  
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", 'X-CSRFToken': getCookie('csrftoken') }
  };
  
   return fetch(url, requestOptions)
}