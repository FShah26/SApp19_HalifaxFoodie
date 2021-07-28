import { withRouter } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const SimilarityScore = (props) => {
    const [score, setScore] = useState('');
  const [data, setData] = useState({
    cuisine: "",
    ingredients0: "",
    ingredients1: "",
    ingredients2: "",
    ingredients3: "",
    ingredients4: "",
    ingredients5: "",
    ingredients6: "",
    ingredients7: "",
    ingredients8: "",
  });

  const formHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setData({ ...data, [name]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("form submitted");
    const url =
      "https://us-central1-utility-league-321023.cloudfunctions.net/function-1";

    axios
      .post(url, data)
      .then(function (response) {
        console.log("the response is: " + response);
        if (response.status === 200) {
          let value = response.data.value / 1000;
          var predictionScore = value + 50;
          setScore(predictionScore);

          console.log(response.data.value);
          console.log(score);
          // props.history.push({
          //   pathname: "/restaurant/1",
          // });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Card style={{ width: "40rem" }}>
      <Card.Body>
        <Card.Title>Enter your recipie</Card.Title>
        <h2>your recipe similarity score is :{score}</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Cuisine</Form.Label>
            <Form.Control type="text" name="cuisine" onChange={formHandler} />
            <Form.Label>Ingrediant 1</Form.Label>
            <Form.Control
              type="text"
              name="ingredients0"
              onChange={formHandler}
            />
            <Form.Label>Ingrediant 2</Form.Label>
            <Form.Control
              type="text"
              name="ingredients1"
              onChange={formHandler}
            />
            <Form.Label>Ingrediants 3</Form.Label>
            <Form.Control
              type="text"
              name="ingredients2"
              onChange={formHandler}
            />
            <Form.Label>Ingrediants 4</Form.Label>
            <Form.Control
              type="text"
              name="ingredients3"
              onChange={formHandler}
            />
            <Form.Label>Ingrediants 5</Form.Label>
            <Form.Control
              type="text"
              name="ingredients4"
              onChange={formHandler}
            />
            <Form.Label>Ingrediants 6</Form.Label>
            <Form.Control
              type="text"
              name="ingredients5"
              onChange={formHandler}
            />
            <Form.Label>Ingrediants 7</Form.Label>
            <Form.Control
              type="text"
              name="ingredients6"
              onChange={formHandler}
            />
            <Form.Label>Ingrediants 8</Form.Label>
            <Form.Control
              type="text"
              name="ingredients7"
              onChange={formHandler}
            />
            <Form.Label>Ingrediants 9</Form.Label>
            <Form.Control
              type="text"
              name="ingredients8"
              onChange={formHandler}
            />
            {""}
          </Form.Group>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
        
      </Card.Body>
    </Card>
  );
};

export default withRouter(SimilarityScore);
