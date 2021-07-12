import React, { useState } from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const MFAInput = ({ logOut }) => {
  const [submitError, setsubmitError] = useState(false);
  const [errMsg, seterrMsg] = useState("");

  const mfaSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements.a1[0].value);
    console.log(e.target.elements.a1[1].value);
  };

  return (
    <div>
      <h1 className="text-center">Halifax Foodie</h1>

      <h3 className="text-center text-primary">MFA</h3>
      <Form onSubmit={mfaSubmit}>
        <Form.Group controlId="a1">
          <Row>
            <Col md="2">
              <Form.Label>Question 1</Form.Label>
            </Col>
            <Col md="10">
              <Form.Control placeholder="Question 1" />
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <Form.Label>Answer</Form.Label>
            </Col>
            <Col md="10">
              <Form.Control placeholder="Answer" />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group controlId="a2">
          <Row>
            <Col md="2">
              <Form.Label>Question 2</Form.Label>
            </Col>
            <Col md="10">
              <Form.Control placeholder="Question 2" />
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <Form.Label>Answer</Form.Label>
            </Col>
            <Col md="10">
              <Form.Control placeholder="Answer" />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group controlId="a3">
          <Row>
            <Col md="2">
              <Form.Label>Question 3</Form.Label>
            </Col>
            <Col md="10">
              <Form.Control placeholder="Question 3" />
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <Form.Label>Answer</Form.Label>
            </Col>
            <Col md="10">
              <Form.Control placeholder="Answer" />
            </Col>
          </Row>
        </Form.Group>

        <div className="text-center">
          {submitError && <p className="text-danger">{errMsg}</p>}
          <p className="text-muted">
            <strong>Note: </strong>End every question with a question mark.
          </p>
          <Button variant="primary" type="submit">
            SUBMIT
          </Button>
          <Link to="/login">
            <Button variant="secondary" onClick={logOut}>
              LOG OUT
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default MFAInput;
