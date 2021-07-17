import React from "react";
import { Card, Button } from "react-bootstrap";
import styled from "styled-components";

const StyledCard = styled(Card)`
  width: auto;
  height: auto;
  box-shadow: 0 0 7px 0 rgba(100, 100, 100, 0.3);
  margin: 10px 5px;
`;

const RestaurantCard = ({ title, imageURL, description, id }) => {
  const cardClick = (e) => {
    console.log(id);
  };
  return (
    <StyledCard>
      <Card.Img variant="top" src={imageURL} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className="text-muted">{description}</Card.Text>
        <Button variant="outline-primary" onClick={cardClick}>
          View menu
        </Button>
      </Card.Body>
    </StyledCard>
  );
};

export default RestaurantCard;
