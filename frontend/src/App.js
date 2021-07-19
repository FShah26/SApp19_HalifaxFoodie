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
import RestaurantHome from "./Restaurant/pages/Home";
import RestaurantMenu from "./Restaurant/pages/Menu";
import Restaurant from "./Pages/Restaurant";

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
        <Route exact path="/restaurant/:id">
          <Restaurant />
        </Route>
        <Route exact path="/">
          <Redirect to="login" />
        </Route>
        <Route exact path="/restaurantHome">
          <RestaurantHome />
        </Route>
        <Route exact path="/restaurantMenu">
          <RestaurantMenu />
        </Route>
      </Router>
    </React.Fragment>
  );
};

export default App;
