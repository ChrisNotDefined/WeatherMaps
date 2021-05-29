import React from "react";
import "./App.css";
import LoginPage from "./pages/login_page/login_page";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import RegisterPage from "./pages/register_page/register_page";
import MapPage from "./pages/map_page/map_page";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Redirect to="/login"/>
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/map">
            <MapPage/>
          </Route>
          <Route path="*">
            <Redirect to="/login"/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
