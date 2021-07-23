import React from "react";
import { Card, Button } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";

const StyledCard = styled(Card)`
  width: auto;
  height: auto;
  box-shadow: 0 0 7px 0 rgba(100, 100, 100, 0.3);
  margin: 10px 5px;
`;

const MenuCard = ({ name, imageURL, ingredients, price, id }) => {
  const history = useHistory();

  const cardClick = () => { 
    history.push(`restaurant/${id}`);
  };

  return (
    <StyledCard>
      <Card.Img variant="top" src={imageURL} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text className="text-muted">{ingredients}</Card.Text>
        <Card.Text className="text-muted">{'$'+price}</Card.Text>
        <Button variant="outline-primary" onClick={cardClick}>
          Order food
        </Button>
      </Card.Body>
    </StyledCard>
  );
};

export default MenuCard;
