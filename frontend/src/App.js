import React,{useState,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import {
  PROFILE_KEY,
  EMAIL_KEY,
  RESTRAUNT_PROFILE
} from "./Utils/AccountUtils";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import { GlobalStyle } from "./GlobalStyles.styled";
import Home from "./Pages/Home";
import MFA from "./Pages/MFA";
import RestaurantHome from "./Restaurant/pages/Home";
import RestaurantMenu from "./Restaurant/pages/Menu";
import Restaurant from "./Pages/Restaurant";
import MenuItem from "./Restaurant/pages/menuItem";
import Chat from "./Restaurant/pages/Chat";
import OrderFood from "./Pages/OrderFood";
import axios from 'axios';
import WordCloud from "./Restaurant/components/WordCloud";
const App = () => {

  
  const profile = localStorage.getItem(PROFILE_KEY);
  const email = localStorage.getItem(EMAIL_KEY);

  const [restaurantDetails,setRestaurantDetails] = useState({});
  const [useremail,setuseremail] = useState(email);

  useEffect(()=>{
    // console.log(userName)
    if(profile === RESTRAUNT_PROFILE)
    {
      fetchRestaurantDetails();
    }
  },[]);

  async function fetchRestaurantDetails(){
    // setIsLoading(true);
    // console.log(userName);
    await axios({
      method:"get",
      url:"https://3resyr4ypg.execute-api.us-east-1.amazonaws.com/PROD/restaurant",
      params:{'useremail':useremail}
    }).then((response)=>{
      setRestaurantDetails(response.data.data[0]);
      // console.log(response.data.data[0]);
      // setIsLoading(false);
    }).catch((error)=>{
      alert(error);
      // setIsLoading(false);
    });
  }

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
        <Route exact path="/orderFood/:id">
          <OrderFood />
        </Route>
        <Route exact path="/">
          <Redirect to="login" />
        </Route>
        <Route exact path="/restaurantHome">
          <RestaurantHome restaurantDetails={restaurantDetails}/>
        </Route>
        <Route exact path="/restaurantMenu">
          <RestaurantMenu restaurantDetails={restaurantDetails}/>
        </Route>
        <Route exact path="/menuItem/:id">
          <MenuItem restaurantDetails={restaurantDetails}/>
        </Route>
        <Route exact path="/chat">
          <Chat role={profile}/>
        </Route>
      </Router>
    </React.Fragment>
  );
};

export default App;
