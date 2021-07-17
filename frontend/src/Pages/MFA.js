import React, { useEffect, useState } from "react";
import { getSessionData, MFA_KEY, PROFILE_KEY } from "../Utils/AccountUtils";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Container, Spinner } from "react-bootstrap";
import { EMAIL_KEY } from "../Utils/AccountUtils";
import UserPool from "../Utils/UserPool";
import MFAInput from "../Components/MFAInput";
import axios from "axios";
import { MFA_PATH } from "../Utils/URL";
import MFAValidate from "../Components/MFAValidate";
import { decodeToken } from "react-jwt";

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
  const [questionData, setquestionData] = useState({});

  const fetchQuestionData = (idToken) => {
    const email = localStorage.getItem("email");
    setaccessToken(idToken);
    axios
      .post(MFA_PATH, JSON.stringify({ email: email }), {
        headers: {
          "Content-Type": "application/json",
          AccessToken: idToken,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setquestionData(res.data.questions);
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
        const profile = decodeToken(data.idToken.jwtToken).profile;
        localStorage.setItem(PROFILE_KEY, profile);
        fetchQuestionData(data.idToken.jwtToken);
      })
      .catch(() => {
        history.push("login");
      });
  }, []);

  const logOut = () => {
    const isUserThere = UserPool.getCurrentUser();
    if (isUserThere) {
      localStorage.removeItem(EMAIL_KEY);
      localStorage.removeItem(MFA_KEY);
      isUserThere.signOut();
      history.push("login");
    }
  };
  if (localStorage.getItem(MFA_KEY) === "true") {
    history.push("/home");
  }

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
    return (
      <MFAContainer>
        <MFAValidate logOut={logOut} questions={questionData} />
      </MFAContainer>
    );
  }
};

export default MFA;
