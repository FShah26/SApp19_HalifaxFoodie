import React, { useState } from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { MFA_PATH } from "../Utils/URL";
import { MFA_KEY } from "../Utils/AccountUtils";

const MFAInput = ({ logOut, questions }) => {
  const [submitError, setsubmitError] = useState(false);
  const [errMsg, seterrMsg] = useState("");
  const history = useHistory();

  const mfaSubmit = (e) => {
    e.preventDefault();

    if (
      e.target.elements.a1.value === questions[0].a &&
      e.target.elements.a2.value === questions[1].a &&
      e.target.elements.a3.value === questions[2].a
    ) {
      localStorage.setItem(MFA_KEY, true);
      setsubmitError(false);
      history.push("/home");
    } else {
      setsubmitError(true);
      seterrMsg("MFA, Failed! Try again.");
    }
  };

  return (
    <div>
      <h1 className="text-center">Halifax Foodie</h1>

      <h3 className="text-center text-primary">MFA</h3>
      <Form onSubmit={mfaSubmit}>
        <Form.Group controlId="a1">
          <Col>
            <Form.Label>{questions[0].q}</Form.Label>
          </Col>
          <Col>
            <Form.Control placeholder="Answer" />
          </Col>
        </Form.Group>

        <Form.Group controlId="a2">
          <Col>
            <Form.Label>{questions[1].q}</Form.Label>
          </Col>
          <Col>
            <Form.Control placeholder="Answer" />
          </Col>
        </Form.Group>

        <Form.Group controlId="a3">
          <Col>
            <Form.Label>{questions[2].q}</Form.Label>
          </Col>
          <Col>
            <Form.Control placeholder="Answer" />
          </Col>
        </Form.Group>

        <div className="text-center">
          {submitError && <p className="text-danger">{errMsg}</p>}
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
