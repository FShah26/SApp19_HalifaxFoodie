import React from "react";
import styled from "styled-components";
import { Container, Col, Row, Spinner } from "react-bootstrap";
import RestaurantCard from "./RestaurantCard";

const RestaurantListingContainer = styled(Container)`
  margin-top: 50px;
`;

const RestaurantsListing = ({ restaurantList }) => {
  return restaurantList.length > 0 ? (
    <RestaurantListingContainer>
      <Row md={4} sm={2} xs={1}>
        {restaurantList.map((restaurant) => (
          <Col>
            <RestaurantCard
              id={restaurant.id}
              title={restaurant.title}
              description={restaurant.description}
              imageURL={restaurant.imageURL}
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
