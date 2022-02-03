import "./App.css";
import * as React from "react";
import Create from "./view/Create";
import { BrowserRouter, Route } from "react-router-dom";
import Result from "./view/Result";
import Home from "./view/Home";
function App() {
  return (
        <BrowserRouter>
            <Route exact path="/" component={Create} />
            <Route exact path="/result" component={Result} />
            <Route exact path="/home" component={Home} />
        </BrowserRouter>
  );
}
export default App;
