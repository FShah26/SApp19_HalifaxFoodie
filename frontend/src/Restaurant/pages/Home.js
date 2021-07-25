import React,{useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import {
  PROFILE_KEY,
  EMAIL_KEY,
  RESTRAUNT_PROFILE
} from "../../Utils/AccountUtils";
import axios from 'axios';
import WordCloud from "../components/WordCloud";

const Home = ({restaurantDetails}) => {

  
  const profile = localStorage.getItem(PROFILE_KEY);
  const email = localStorage.getItem(EMAIL_KEY);
  const location = useLocation();
  const [useremail,setuseremail] = useState(email);
  const [orderData,setOrderData] = useState([]);
  const [resId,setResId] = useState(restaurantDetails.resid);
  // const [restaurantDetails,setRestaurantDetails] = useState(location.state.restaurantDetails);

  useEffect(()=>{
    if(profile === RESTRAUNT_PROFILE)
    {
      fetchRestaurantDetails();
    }
    if(resId>0)
    {
      fetchOrderHistory();
    }
    // console.log(restaurantDetails);
  },[restaurantDetails]);

  async function fetchRestaurantDetails(){
    // setIsLoading(true);
    // console.log(userName);
    await axios({
      method:"get",
      url:"https://3resyr4ypg.execute-api.us-east-1.amazonaws.com/PROD/restaurant",
      params:{'useremail':useremail}
    }).then((response)=>{
      // setRestaurantDetails(response.data.data[0]);
      if(!restaurantDetails.lenght > 0)
      {
        
        restaurantDetails = Object.assign({}, response.data.data[0]);
        setResId(restaurantDetails.resid);
        console.log("From fetchRest",restaurantDetails);
      }
      // restaurantDetails = [...response.data.data[0]];
      // console.log(response.data.data[0]);
      // setIsLoading(false);
    }).catch((error)=>{
      alert(error);
      // setIsLoading(false);
    });
  }

  

  async function fetchOrderHistory(){
    // setIsLoading(true);
    // console.log(userName);
    await axios({
      method:"get",
      url:"https://x02wf9ljy6.execute-api.us-east-1.amazonaws.com/PROD/orderhistory",
      params:{'restaurantId':restaurantDetails.resid}
    }).then((response)=>{
      setOrderData(response.data.data);
      console.log(response.data.data);
      // setIsLoading(false);
    }).catch((error)=>{
      alert(error);
      // setIsLoading(false);
    });
  }
  return (
    <div>
      <Navbar restaurantDetails={restaurantDetails}></Navbar>
      <div className="outer">
        <div className="inner">
            {/* <div className="avatar">
                <img src="" className="card-img-top"/> */}
            {/* </div>
            <h5 className="card-title" >Restaurant Name</h5> */}
            <p className="card-text" >{restaurantDetails.resdesc}</p>
            {orderData.length > 0 ? 
            <div>
            <h5>Customer's favourites</h5>
            <WordCloud menuItemId={0} orderData={orderData}/>
            </div>
            :
            <div></div>
            }
            
        </div>
    </div>
    </div>

  );
};

export default Home;
