import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Container, Col, Row, Spinner } from "react-bootstrap";
import MenuCard from "../Components/MenuCard";
import axios from "axios";
import { MENU_PATH } from "../Utils/Routes";
import { ID_TOKEN } from "../Utils/AccountUtils";


const Restaurant = () => {
    const { id } = useParams();
    return <div>RestaurantID: {id}</div>;
};

export default Restaurant;