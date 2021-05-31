import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRState, ReduxAction } from "./redux/reducers";
import LoginPage from "./pages/login_page/login_page";
import RegisterPage from "./pages/register_page/register_page";
import MapPage from "./pages/map_page/map_page";
import "./App.css";
import firebaseApp from "./utils/firebaseApp";
import { AUTH_CHANGED } from "./redux/actionTypes";

function App() {
  const isLoggedIn = useSelector<IRState>((state) => state.loggedInID);
  const dispatch = useDispatch();

  useEffect(() => {
    const loginSubs = firebaseApp.auth().onAuthStateChanged((data) => {
      if (data) {
        dispatch<ReduxAction>({ type: AUTH_CHANGED, payload: data.uid });
      } else {
        dispatch({ type: AUTH_CHANGED, payload: null });
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
