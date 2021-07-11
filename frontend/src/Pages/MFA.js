import React, { useEffect } from "react";
import { getSessionData } from "../Utils/AccountUtils";
import { useHistory } from "react-router-dom";

const MFA = () => {
  const history = useHistory();
  useEffect(() => {
    getSessionData()
      .then((data) => {
        console.log(data.idToken);
      })
      .catch(() => {
        history.push("login");
      });
  }, []);

  return <div>MFA</div>;
};

export default MFA;
