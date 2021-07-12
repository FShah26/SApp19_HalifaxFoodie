import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import { GlobalStyle } from "./GlobalStyles.styled";
import Home from "./Pages/Home";
import MFA from "./Pages/MFA";

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/mfa">
            <MFA />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
        </Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Redirect to="login" />
        </Route>
      </Router>
    </React.Fragment>
  );
};

export default App;
