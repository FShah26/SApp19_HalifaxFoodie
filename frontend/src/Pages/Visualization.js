import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";

import axios from "axios";
import { EMAIL_KEY } from "../Utils/AccountUtils";

const Visualization = () => {
    const { id } = useParams();

  useEffect(() => {
    //fetchVisualization();
    }, []);

    async function fetchVisualization() {

        window.location.href = "https://datastudio.google.com/reporting/6e280305-62e7-4fd3-81da-0d9470e882aa";
        // await axios({
        //     method:"get",
        //     url:"https://datastudio.google.com/s/vXRURKO6biY",
        //     //params:{'restaurantId':restaurantId}
        // }).then((response)=>{
        //     alert(response.data.message);
        // }).catch((error)=>{
        //     alert(error);
        // });
    };

  return (
    <div>
      <h1> Visualization: </h1>
        <div className="form-group"> 
        <iframe width="1000" height="1000" src="https://datastudio.google.com/embed/reporting/f5508dab-8392-4c06-9ce6-b7d3745932c9/page/uNQWC" frameborder="0" allowfullscreen></iframe>
        </div>
    </div>
  );

};

export default Visualization;