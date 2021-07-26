import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { withRouter } from "react-router";

const OrderItem = (props) => {
  const [s, ss] = useState("hello");
  console.log(props.orders);
  const orderdata = Array.from(props.orders);

  const feedbackHandler = () => {
    props.history.push("/feedback");
    // console.log(props.data);
  };

  return (
    <div>
      {orderdata.map((data, i) => (
        <Card style={{ width: "18rem", height:"15rem",}} key={i}>
          <Card.Body>
            <Card.Title>{data.restaurantName}</Card.Title>
            <Card.Text>order ID: {data.orderID}</Card.Text>
            <Card.Text>{data.food}</Card.Text>
          </Card.Body>
        </Card>
      ))}

      {/* <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map(ig => (
          <li key={ig.id} onClick={props.onRemoveItem.bind(this, ig.id)}>
            <span>{ig.title}</span>
            <span>{ig.amount}x</span>
          </li>
        ))}
      </ul>
    </section> */}
    </div>
  );
};

export default withRouter(OrderItem);
