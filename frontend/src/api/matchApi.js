import React, { useState, useEffect } from "react";
import { getCookie } from "../util/cookie";
import { API_LINK } from "../util/environmentConfig"

export const newMatch = (id, matchTime) => {
  const url = `${API_LINK}/api/new-match/`;
  
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
  const url = `${API_LINK}/api/member-match-list/${memberId}/`;
  
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", 'X-CSRFToken': getCookie('csrftoken') }
  };
  
   return fetch(url, requestOptions)
}

export const deleteMatch= (id) => {
  const url = `${API_LINK}/api/delete-match/${id}/`;
  
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", 'X-CSRFToken': getCookie('csrftoken') }
  };
  
   return fetch(url, requestOptions)
}