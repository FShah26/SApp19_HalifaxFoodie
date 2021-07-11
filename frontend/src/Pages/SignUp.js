import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import styled from "styled-components";

const LoginContainer = styled(Container)`
  margin-top: 50px;
`;

const Login = () => {
  const [submitError, setsubmitError] = useState(false);

  const signUp = (e) => {
    e.preventDefault();
    console.log("Submit");
  };

  return (
    <LoginContainer>
      <h1 className="text-center">Halifax Foodie</h1>

      <h3 className="text-center text-primary">SIGN UP</h3>
      <Form onSubmit={signUp}>
        <Form.Group controlId="emailAddress">
          <Form.Label>Email</Form.Label>
          <Form.Control type="emailaddress" placeholder="Email" />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control placeholder="Password" type="password" />
        </Form.Group>
        <Form.Group controlId="repassword">
          <Form.Label>Re-enter Password</Form.Label>
          <Form.Control placeholder="Password" type="password" />
        </Form.Group>

        <div className="text-center">
          {submitError && <p className="text-danger">Sign Up Failed</p>}
          <Button variant="primary" type="submit">
            SIGN UP
          </Button>
        </div>
      </Form>
    </LoginContainer>
  );
};

export default Login;
