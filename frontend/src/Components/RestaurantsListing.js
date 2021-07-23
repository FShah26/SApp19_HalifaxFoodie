import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Col, Row, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import axios from "axios";
import { RESTAURANTS_PATH } from "../Utils/Routes";
import { ID_TOKEN,PROFILE_KEY,EMAIL_KEY } from "../Utils/AccountUtils";

const RestaurantListingContainer = styled(Container)`
  margin-top: 50px;
`;

const RestaurantsListing = () => {
  const history = useHistory();
  const [restaurantList, setrestaurantList] = useState([]);
  const idtoken = localStorage.getItem(ID_TOKEN);
  const profile = localStorage.getItem(PROFILE_KEY);
  const userName = localStorage.getItem(EMAIL_KEY);

  useEffect(() => {
    axios
      .post(
        RESTAURANTS_PATH,
        {},
        {
          headers: {
            AccessToken: idtoken,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setrestaurantList(res.data.data);
        }
      })
      .catch((e) => {
        console.error(e.message);
      });
  }, []);

  const initiateChat = (restaurantName) => {
    console.log("User",userName)
    console.log("Restaurant",restaurantName)
    history.push({
      pathname:'/chat',
      state: {role:profile,restaurantName:restaurantName,userName:userName }
    });

  };

  return restaurantList.length > 0 ? (
    <RestaurantListingContainer>
      <Row md={4} sm={2} xs={1}>
        {restaurantList.map((restaurant) => (
          <Col>
            <RestaurantCard
              id={restaurant.resid}
              title={restaurant.resname}
              description={restaurant.resdesc}
              imageURL={restaurant.image}
              // role={profile}
              // userName={userName}
            contactRestaurant = {initiateChat}
            />
          </Col>
        ))}
      </Row>
    </RestaurantListingContainer>
  ) : (
    <RestaurantListingContainer>
      <Spinner animation="border" size="lg" />
    </RestaurantListingContainer>
  );
};

export default RestaurantsListing;
