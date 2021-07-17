import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";

const RestaurantListingContainer = styled(Container)`
  margin-top: 50px;
`;

const RestaurantsListing = () => {
  return (
    <RestaurantListingContainer>List of restaurants</RestaurantListingContainer>
  );
};

export default RestaurantsListing;
