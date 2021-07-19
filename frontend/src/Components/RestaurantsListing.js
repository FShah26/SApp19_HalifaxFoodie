import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Col, Row, Spinner } from "react-bootstrap";
import RestaurantCard from "./RestaurantCard";
import axios from "axios";
import { RESTAURANTS_PATH } from "../Utils/Routes";
import { ID_TOKEN } from "../Utils/AccountUtils";

const RestaurantListingContainer = styled(Container)`
  margin-top: 50px;
`;

const RestaurantsListing = () => {
  const [restaurantList, setrestaurantList] = useState([]);
  const idtoken = localStorage.getItem(ID_TOKEN);

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
