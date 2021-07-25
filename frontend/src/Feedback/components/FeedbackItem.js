import { withRouter } from "react-router";
import { useState } from "react";
import { Card, Button } from "react-bootstrap";

const FeedbackItem = (props) => {
  const foodData = Array.from(props.foodItems);

  return (
    <div>
      {foodData.map((data, i) => (
        <Card style={{ width: "18rem", height:"34rem",}} key={i}>
          <Card.Img variant="top" src={data.imgUrl} />
          <Card.Body>
            <Card.Title>{data.name}</Card.Title>
            <Card.Text>{data.ingredients}</Card.Text>
            <Card.Text>Price: {data.price}</Card.Text>
            <Button
              variant="primary"
              onClick={() => {
                props.history.push({
                  pathname: "/feedback",
                  restaurantId: props.restaurantId,
                  menuItemId: data.Id,
                  foodItem: data.name
                });
              }}
            >
              {/*
                id={menuItem.Id}
              name={menuItem.name}
              ingredients={menuItem.ingredients}
              price={menuItem.price}
              imageURL={menuItem.imgUrl}
            */}
              Feedback
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default withRouter(FeedbackItem);
