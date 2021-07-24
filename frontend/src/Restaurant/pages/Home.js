import React,{useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import axios from 'axios';
const Home = ({restaurantDetails}) => {

  const location = useLocation();
  const [useremail,setuseremail] = useState(restaurantDetails.useremail);

  // useEffect(()=>{
  //   // console.log(userName)
  //   fetchRestaurantDetails();
  // },[]);

  // async function fetchRestaurantDetails(){
  //   // setIsLoading(true);
  //   // console.log(userName);
  //   await axios({
  //     method:"get",
  //     url:"https://3resyr4ypg.execute-api.us-east-1.amazonaws.com/PROD/restaurant",
  //     params:{'useremail':useremail}
  //   }).then((response)=>{
  //     setRestaurantDetails(response.data.data[0]);
  //     // console.log(response.data.data[0]);
  //     // setIsLoading(false);
  //   }).catch((error)=>{
  //     alert(error);
  //     // setIsLoading(false);
  //   });
  // }
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
        </div>
    </div>
    </div>

  );
};

export default Home;
