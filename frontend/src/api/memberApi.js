import React, { useState, useEffect } from "react";
import { getCookie } from "../util/cookie";

export const setGetMember = (name, mail) => {
  const url = "http://127.0.0.1:8000/api/set-get-member/";

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
  const url = "http://127.0.0.1:8000/api/update-member/";

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