import React,{useState,useEffect} from "react";
import UserPool from "../Utils/UserPool";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {
  EMAIL_KEY,
  MFA_KEY,
  PROFILE_KEY,
  USER_PROFILE,
  RESTRAUNT_PROFILE
} from "../Utils/AccountUtils";
import styled from "styled-components";
import RestaurantsListing from "../Components/RestaurantsListing";
import RestaurantHome from "../Restaurant/pages/Home";
import axios from 'axios';
const HomePageContainer = styled(Container)`
  margin-top: 50px;
  & button {
    margin: 10px;
  }
`;

const Home = () => {
  const history = useHistory();
  const profile = localStorage.getItem(PROFILE_KEY);
  const email = localStorage.getItem(EMAIL_KEY);
  const [restaurantDetails,setRestaurantDetails] = useState({});

  !localStorage.getItem(MFA_KEY) && history.push("mfa");

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
      params:{'useremail':email}
    }).then((response)=>{
      setRestaurantDetails(response.data.data[0]);
      // console.log(response.data.data[0]);
      // setIsLoading(false);
    }).catch((error)=>{
      alert(error);
      // setIsLoading(false);
    });
  }

  const logOut = () => {
    const isUserThere = UserPool.getCurrentUser();
    if (isUserThere) {
      localStorage.removeItem(EMAIL_KEY);
      localStorage.removeItem(MFA_KEY);
      isUserThere.signOut();
      history.push("login");
    }
  };

  const visualization = () => {
    const isUserThere = UserPool.getCurrentUser();
    if (isUserThere) {
      history.push("visualization");
    }
  };

  return (
    <>
      {profile === USER_PROFILE ? (
        <HomePageContainer>
          <Row>
          <Col xs="8" md="10">
            <h1 className="text-muted"> Home </h1>
          </Col>
          <Col xs="6" md="2">
            <Button variant="danger" onClick={visualization}>
              Visualization
            </Button>
          </Col> 
          <Col xs="4" md="2">
            <Button variant="danger" onClick={logOut}>
              Log Out
            </Button>
          </Col>
        </Row>
        <Row>
            <RestaurantsListing />
        </Row>
        </HomePageContainer>
        ) : (
          <RestaurantHome restaurantDetails={restaurantDetails}/>
        )}
        </>
  );
};

export default Home;
