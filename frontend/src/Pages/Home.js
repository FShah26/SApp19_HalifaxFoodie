import React, { useEffect } from "react";
import UserPool from "../Utils/UserPool";
import { Button } from "react-bootstrap";
import { getSessionData } from "../Utils/AccountUtils";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  const logOut = () => {
    const isUserThere = UserPool.getCurrentUser();
    if (isUserThere) {
      isUserThere.signOut();
      history.push("login");
    }
  };

  useEffect(() => {
    getSessionData()
      .then((data) => {
        console.log(data);
      })
      .catch(() => {
        history.push("login");
      });
  }, []);

  return (
    <div>
      <Button onClick={logOut}>Log Out</Button>
    </div>
  );
};

export default Home;
