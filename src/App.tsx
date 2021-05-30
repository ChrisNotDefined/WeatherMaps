import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRLogin } from "./redux/reducers";
import LoginPage from "./pages/login_page/login_page";
import RegisterPage from "./pages/register_page/register_page";
import MapPage from "./pages/map_page/map_page";
import "./App.css";
import firebaseApp from "./utils/firebaseApp";
import { AUTH_CHANGED } from "./redux/actionTypes";

function App() {
  const isLoggedIn = useSelector<IRLogin>((state) => state.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const loginSubs = firebaseApp.auth().onAuthStateChanged((data) => {
      if (data) {
        dispatch({ type: AUTH_CHANGED, payload: true });
      } else {
        dispatch({type: AUTH_CHANGED, payload: false})
      }
    });

    return () => {
      loginSubs();
    };
  });

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            {isLoggedIn ? <Redirect to="/map" /> : <LoginPage />}
          </Route>
          <Route path="/register">
            {isLoggedIn ? <Redirect to="/map" /> : <RegisterPage />}
          </Route>
          <Route path="/map">
            {isLoggedIn ? <MapPage /> : <Redirect to="/login" />}
          </Route>
          <Route path="*">
            {isLoggedIn ? <Redirect to="/map" /> : <Redirect to="/login" />}
            <Redirect to="/login" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
