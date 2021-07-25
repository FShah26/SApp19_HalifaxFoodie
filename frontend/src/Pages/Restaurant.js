import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Container, Col, Row, Spinner } from "react-bootstrap";
import MenuCard from "../Components/MenuCard";
import axios from "axios";
import { MENU_PATH } from "../Utils/Routes";
import { ID_TOKEN } from "../Utils/AccountUtils";

const MenuListingContainer = styled(Container)`
  margin-top: 50px;
`;

const Restaurant = () => {
  const { id } = useParams();
  const [menuList, setMenuList] = useState([]);
  const idtoken = localStorage.getItem(ID_TOKEN);
  const [restaurantId, setRestaurantId] = useState(id);



    useEffect(() => {
      fetchMenuItems();
        }, []);
    
    async function fetchMenuItems(){
      // setIsLoading(true);
      await axios({
        method:"get",
        url:"https://x02wf9ljy6.execute-api.us-east-1.amazonaws.com/PROD",
        params:{'restaurantId':restaurantId}
      }).then((response)=>{
        setMenuList(response.data.data);
        // console.log(response.data.data);
        // setIsLoading(false);
      }).catch((error)=>{
        alert(error);
        // setIsLoading(false);
      });
    }

  return menuList.length > 0 ? (
    <MenuListingContainer>
      <Row md={4} sm={2} xs={1}>
        {menuList.map((menuItem) => (
          <Col>
            <MenuCard
              id={menuItem.Id}
              name={menuItem.name}
              ingredients={menuItem.ingredients}
              price={menuItem.price}
              imageURL={menuItem.imgUrl}
            />
          </Col>
        ))}
      </Row>
    </MenuListingContainer>
  ) : (
    <MenuListingContainer>
      <Spinner animation="border" size="lg" />
    </MenuListingContainer>
  );
  //return <div>RestaurantID: {id}</div>;
};

export default Restaurant;
