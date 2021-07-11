import React, { useEffect } from "react";
import UserPool from "../Utils/UserPool";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { EMAIL_KEY, MFA_KEY } from "../Utils/AccountUtils";

const Home = () => {
  const history = useHistory();

  const logOut = () => {
    const isUserThere = UserPool.getCurrentUser();
    if (isUserThere) {
      localStorage.removeItem(EMAIL_KEY);
      isUserThere.signOut();
      history.push("login");
    }
  };

  !localStorage.getItem(MFA_KEY) && history.push("mfa");

  return (
    <div>
      <Button onClick={logOut}>Log Out</Button>
    </div>
  );
};

export default Home;
