import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Container, Col, Row, Spinner } from "react-bootstrap";
import MenuCard from "../Components/MenuCard";
import axios from "axios";
import { MENU_PATH } from "../Utils/Routes";
import { ID_TOKEN } from "../Utils/AccountUtils";
import WordCloud from "../Restaurant/components/WordCloud";


const Restaurant = () => {
    const { id } = useParams();
    const [values, setValues] = useState({
      name: "",
      address: "",
  });
  
    const orderFood = () => {
      console.log("function call")
        saveAddedItem();
        alert("Your order has been placed sucessfully. Your food will be delivered on your address soon.")
    };

    async function saveAddedItem()
  {
    //setIsLoading(true);
    //console.log(menuItem);
    await axios({
      method:"post",
      url:"https://5zi1castr4.execute-api.us-east-1.amazonaws.com/MyAPI/",
      params:{'menuId':id},
      headers: {
        "Content-Type": "application/json",
        Authorization: "myValue",
      },
      data:{
        "id" : id,
        "name" : values.name,
        "address" : values.address 
      }
    }).then((response)=>{
      alert(response.data.message);
      //setIsLoading(false);
    }).catch((error)=>{
      alert(error);
      //setIsLoading(false);
    });
  }

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
      };
      

    return (
        <div> 
            <div className="outer"></div>
            <div>
                <h1> Food Delivery Details: </h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="firstName">Enter your Name:</label>
                        <input className="form-control" placeholder="name"  type="text" id="name" name="name" value={values.name} onChange={handleChange}  /><br/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">Enter your delivery addresss:</label>
                        <input className="form-control" placeholder="address"  type="text" id="address" name="address" value={values.address} onChange={handleChange}  /><br/>
                    </div>
                    <div className="form-group"> 
                        <button type="button" className="btn btn-primary" onClick={orderFood} >Submit</button>
                    </div>
                </form>
            </div>
            <div>
              <h5>Below are reviews of our customers for the item you've selected</h5>
              <WordCloud menuItemId={id} orderData={[]}/>
            </div>
        </div>
    );
};

export default Restaurant;