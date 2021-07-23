import React from "react";
import { Card, Button,OverlayTrigger,Tooltip } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import { ChatLeftDotsFill } from "react-bootstrap-icons";
const StyledCard = styled(Card)`
  width: auto;
  height: auto;
  box-shadow: 0 0 7px 0 rgba(100, 100, 100, 0.3);
  margin: 10px 5px;
`;

const RestaurantCard = ({ title, imageURL, description, id,contactRestaurant }) => {
  const history = useHistory();

  const cardClick = () => {
    history.push(`restaurant/${id}`);
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
        <a onClick={()=> {contactRestaurant(title)}}>
          <OverlayTrigger 
            key={id}
            placement='top'
            overlay={
            <Tooltip id={id}>
              Contact Restaurant
            </Tooltip>
          }>
            <ChatLeftDotsFill size={30} />
          </OverlayTrigger>
        </a>
      </Card.Body>
    </StyledCard>
  );
};

export default RestaurantCard;
