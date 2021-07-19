import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import UserPool from "../Utils/UserPool";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

const LoginContainer = styled(Container)`
  margin-top: 50px;
`;

const Login = () => {
  const [submitError, setsubmitError] = useState(false);
  const [errMsg, seterrMsg] = useState("");
  const history = useHistory();

  const setError = (errorMsg) => {
    setsubmitError(true);
    seterrMsg(errorMsg);
  };

  const signUp = (e) => {
    e.preventDefault();
    const email = e.target.elements.emailAddress.value;
    const pass = e.target.elements.password.value;
    const repass = e.target.elements.repassword.value;
    const accountType = e.target.elements.userselect.value;

    if (pass !== repass) {
      setError("Password didn't match");
      return;
    }

    if (pass.length < 8) {
      setError("Password length less than 8");
      return;
    }

    var attributeRole = new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "profile",
      Value: accountType,
    });

    UserPool.signUp(email, pass, [attributeRole], null, (err, data) => {
      if (err) {
        setError(err.message);
      } else {
        setsubmitError(false);
        history.push("/login", { signup: true });
      }
    });
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

        <Form.Group controlId="userselect">
          <Form.Label>Account Type</Form.Label>

          <Form.Control as="select" size="md" custom>
            <option value="user">User</option>
            <option value="restraunt">Restraunt</option>
          </Form.Control>
        </Form.Group>

        <div className="text-center">
          {submitError && <p className="text-danger">{errMsg}</p>}
          <Button variant="primary" type="submit">
            SIGN UP
          </Button>
        </div>
      </Form>
    </LoginContainer>
  );
};

export default Login;
