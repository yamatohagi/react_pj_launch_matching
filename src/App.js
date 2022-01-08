import "./App.css";
import * as React from "react";
import Create from "./view/Create";
import { BrowserRouter, Route } from "react-router-dom";
import Result from "./components/Result";

function App() {

  return (
    <form>
      <div className="App">
        <BrowserRouter>
            <div>
            <Route exact path="/" component={Create} />
            <Route exact path="/result" component={Result} />
          </div>
        </BrowserRouter>
      </div>
    </form>
  );
}
export default App;
