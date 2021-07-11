import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LoginContainer = styled(Container)`
  margin-top: 50px;
  & button {
    margin: 10px;
  }
`;

const Login = () => {
  const [submitError, setsubmitError] = useState(false);

  const signIn = (e) => {
    e.preventDefault();
    console.log("Submit");
  };

  return (
    <LoginContainer>
      <h1 className="text-center">Halifax Foodie</h1>

      <h3 className="text-center text-primary">LOGIN</h3>
      <Form onSubmit={signIn}>
        <Form.Group controlId="emailAddress">
          <Form.Label>Email</Form.Label>
          <Form.Control type="emailaddress" placeholder="Email" />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control placeholder="Password" type="password" />
        </Form.Group>

        <div className="text-center">
          {submitError && (
            <p className="text-danger">Invalid email and password</p>
          )}
          <Button variant="primary" type="submit">
            LOGIN
          </Button>
          <Link to="/signup">
            <Button variant="secondary">SIGN UP</Button>
          </Link>
        </div>
      </Form>
    </LoginContainer>
  );
};

export default Login;
