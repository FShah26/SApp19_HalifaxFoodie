import React from "react";
import UserPool from "../Utils/UserPool";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { EMAIL_KEY, MFA_KEY } from "../Utils/AccountUtils";
import styled from "styled-components";
import RestaurantsListing from "../Components/RestaurantsListing";

const HomePageContainer = styled(Container)`
  margin-top: 50px;
  & button {
    margin: 10px;
  }
`;

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
    <HomePageContainer>
      <Row>
        <Col xs="12" md="10">
          <h1 className="text-muted"> Home </h1>
        </Col>
        <Col xs="12" md="2">
          <Button variant="danger" onClick={logOut}>
            Log Out
          </Button>
        </Col>
      </Row>
      <row>
        <RestaurantsListing />
      </row>
    </HomePageContainer>
  );
};

export default Home;
