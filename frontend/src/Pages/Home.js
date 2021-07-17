import React from "react";
import UserPool from "../Utils/UserPool";
import { Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { EMAIL_KEY, MFA_KEY } from "../Utils/AccountUtils";

const Home = () => {
  const history = useHistory();

  !localStorage.getItem(MFA_KEY) && history.push("mfa");

  const logOut = () => {
    const isUserThere = UserPool.getCurrentUser();
    if (isUserThere) {
      localStorage.removeItem(EMAIL_KEY);
      localStorage.removeItem(MFA_KEY);
      isUserThere.signOut();
      history.push("login");
    }
  };

  return (
    <Container>
      <Button variant="secondary" onClick={logOut}>
        Log Out
      </Button>
    </Container>
  );
};

export default Home;
