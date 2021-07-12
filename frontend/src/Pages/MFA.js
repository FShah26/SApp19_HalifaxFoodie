import React, { useEffect, useState } from "react";
import { getSessionData } from "../Utils/AccountUtils";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Container, Spinner } from "react-bootstrap";
import { EMAIL_KEY } from "../Utils/AccountUtils";
import UserPool from "../Utils/UserPool";
import MFAInput from "../Components/MFAInput";
import axios from "axios";
import { MFA_PATH } from "../Utils/URL";

const MFAContainer = styled(Container)`
  margin-top: 50px;
  & .row {
    margin-top: 10px;
  }
  & .form-group {
    margin-top: 20px;
  }

  & button {
    margin: 10px;
  }
`;

const MFA = () => {
  const history = useHistory();
  const [userQuestionsStatus, setuserQuestionsStatus] = useState(null);
  const [accessToken, setaccessToken] = useState(null);
  let questionData;

  const fetchQuestionData = (idToken) => {
    const email = localStorage.getItem("email");
    setaccessToken(idToken.jwtToken);
    axios
      .post(MFA_PATH, JSON.stringify({ email: email }), {
        headers: {
          "Content-Type": "application/json",
          AccessToken: idToken.jwtToken,
        },
      })
      .then((res) => {
        if (res.data.success) {
          questionData = res.data.questions;
        }
        setuserQuestionsStatus(res.data.success);
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  useEffect(() => {
    getSessionData()
      .then((data) => {
        fetchQuestionData(data.idToken);
      })
      .catch(() => {
        history.push("login");
      });
  }, []);

  const logOut = () => {
    const isUserThere = UserPool.getCurrentUser();
    if (isUserThere) {
      localStorage.removeItem(EMAIL_KEY);
      isUserThere.signOut();
      history.push("login");
    }
  };
  if (userQuestionsStatus == null) {
    return (
      <MFAContainer>
        <Spinner animation="border" variant="primary" />
      </MFAContainer>
    );
  } else if (userQuestionsStatus == false) {
    return (
      <MFAContainer>
        <MFAInput logOut={logOut} accessToken={accessToken} />
      </MFAContainer>
    );
  } else {
    return <MFAContainer>Have Questions</MFAContainer>;
  }
};

export default MFA;
