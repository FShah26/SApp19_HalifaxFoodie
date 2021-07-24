import { withRouter } from "react-router";
import { Card, Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const Feedback = (props) => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");

  const onChangeValue = (event) => {
    setFeedback(event.target.value);
    console.log(feedback);
    // console.log(feedbackData);
  };

  const onChangeRating = (event) => {
    setRating(event.target.value);
    console.log(rating);
    // console.log(feedbackData);
  };

  const feedbackData = {
    menuItemId: props.location.menuItemId,
    restaurantId:props.location.restaurantId,
    rating:rating,
    feedback: feedback,
  };

  const feedbackSubmitHandler = (event) => {
    event.preventDefault();
    console.log("ff");

    const url = "http://localhost:2100/api/orders/feedback";

    axios
      .post(url, feedbackData)
      .then(function (response) {
        console.log("the response is: " + response);
        if (response.status === 200) {
          // console.log(response.status);
          // console.log(response.data);
          if (response.data.success) {
            props.history.push({
              pathname: "/",
            });
          } else {
            console.log("");
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <h1 className="text-center">Feedback</h1>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Feedback</Card.Title>
          <Card.Text>food Item: {props.location.foodItem}</Card.Text>
          <Card.Text>Ratings:</Card.Text>

          <Form onSubmit={feedbackSubmitHandler}>
            {["radio"].map((type) => (
              <div
                key={`inline-${type}`}
                className="mb-3"
                onChange={onChangeRating}
              >
                <Form.Check
                  inline
                  label="1"
                  value="1"
                  name="group1"
                  type={type}
                  id={`inline-${type}-1`}
                />
                <Form.Check
                  inline
                  label="2"
                  value="2"
                  name="group1"
                  type={type}
                  id={`inline-${type}-2`}
                />
                <Form.Check
                  inline
                  label="3"
                  value="3"
                  name="group1"
                  type={type}
                  id={`inline-${type}-3`}
                />
                <Form.Check
                  inline
                  label="4"
                  value="4"
                  name="group1"
                  type={type}
                  id={`inline-${type}-4`}
                />
                <Form.Check
                  inline
                  label="5"
                  value="5"
                  name="group1"
                  type={type}
                  id={`inline-${type}-5`}
                />
              </div>
            ))}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Comments</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={onChangeValue}/>
            </Form.Group>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default withRouter(Feedback);
