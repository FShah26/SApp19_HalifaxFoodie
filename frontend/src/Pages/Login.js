import React, { useState, useEffect } from "react";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import UserPool from "../Utils/UserPool";
import { EMAIL_KEY, getSessionData, MFA_KEY } from "../Utils/AccountUtils";

const LoginContainer = styled(Container)`
  margin-top: 50px;
  & button {
    margin: 10px;
  }
`;

const Login = () => {
  const [submitError, setsubmitError] = useState(false);
  const [errMsg, seterrMsg] = useState("");
  const history = useHistory();

  useEffect(() => {
    getSessionData().then((data) => {
      if (localStorage.getItem(MFA_KEY) === true) history.push("home");
      else history.push("mfa");
    });
  }, []);

  const setError = (errorMsg) => {
    setsubmitError(true);
    seterrMsg(errorMsg);
  };

  const signIn = (e) => {
    e.preventDefault();

    const mailID = e.target.elements.emailAddress.value;
    const pass = e.target.elements.password.value;

    const user = new CognitoUser({
      Username: mailID,
      Pool: UserPool,
    });

    user.authenticateUser(
      new AuthenticationDetails({
        Username: mailID,
        Password: pass,
      }),
      {
        onSuccess: (d) => {
          localStorage.setItem(EMAIL_KEY, mailID);
          history.push("/mfa");
        },
        onFailure: (e) => {
          console.error("fail: ", e);
          setError(e.message);
        },
        newPasswordRequired: (d) => {
          console.log("needNewPass: ", d);
        },
      }
    );

    console.log("Submit");
  };

  return (
    <LoginContainer>
      <h1 className="text-center">Halifax Foodie</h1>

      <h3 className="text-center text-primary">LOGIN</h3>
      <Form onSubmit={signIn}>
        <Form.Group controlId="emailAddress">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control placeholder="Password" type="password" />
        </Form.Group>

        <div className="text-center">
          {submitError && <p className="text-danger">{errMsg}</p>}
          <p className="text-muted">
            <strong>Note: </strong>Confirm/Verify the user with given E-mail
            before login.
          </p>
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
