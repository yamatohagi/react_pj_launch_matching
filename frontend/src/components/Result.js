import React from "react";

import { useLocation } from "react-router-dom";

function Result() {
  const { state } = useLocation();
  console.log(state);
  var str = JSON.stringify(state);

  return <div>Hello, {str}</div>;
}

export default Result;
