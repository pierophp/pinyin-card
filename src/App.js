import React from "react";
import { HashRouter as Router } from "react-router-dom";
import AppBarDrawer from "./components/template/AppBarDrawer";
import Routes from "./components/route/Routes";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <AppBarDrawer />
        <div className="AppContainer">
          <Routes />
        </div>
      </Router>
    </div>
  );
}

export default App;
