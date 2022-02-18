import React, { useState, useEffect } from "react";
import { getCookie } from "../util/cookie";
import { API_LINK } from "../util/environmentConfig"

export const setGetMember = (name, mail) => {
  const url = `${API_LINK}/api/set-get-member/`;
  
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", 'X-CSRFToken': getCookie('csrftoken') },
    body: JSON.stringify({
      mail: mail,
      name: name
    }),
  };
  
   return fetch(url, requestOptions)
}

export const updateMember = (id, name, dept) => {
  const url = `${API_LINK}/api/update-member/`;
  
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", 'X-CSRFToken': getCookie('csrftoken') },
    body: JSON.stringify({
      id: id,
      dept: dept,
      name: name
    }),
  };
  
   return fetch(url, requestOptions)
}