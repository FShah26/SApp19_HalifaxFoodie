import React from "react";
import { useParams } from "react-router-dom";

const Restaurant = () => {
  const { id } = useParams();
  return <div>RestaurantID: {id}</div>;
};

export default Restaurant;
