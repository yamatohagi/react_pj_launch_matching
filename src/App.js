import "./App.css";
import * as React from "react";
import Create from "./Create";
import { BrowserRouter, Route } from "react-router-dom";
import page1 from "./components/page1";

function App() {
  return (
    <form>
      <div className="App">
        <BrowserRouter>
            <div>
            <Route exact path="/" component={Create} />
            <Route exact path="/about" component={page1} />
          </div>
        </BrowserRouter>
      </div>
    </form>
  );
}
export default App;
