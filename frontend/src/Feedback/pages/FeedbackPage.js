import { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { useParams } from "react-router";
import FeedbackItem from "../components/FeedbackItem";
import axios from "axios";

const FeedbackPage = () => {

    const { id } = useParams();
    const [restaurantId,setRestaurantId] = useState(id);

    // Here this will be converted to post request to post
    // the userID which is logged in and get it order details
  
    const [foodItems, setFoodItems] = useState({});
    const [nullOrders, setnullOrders] = useState("");
    useEffect(() => {
      async function fetchData() {
        await axios({
            method:"get",
            url:"https://x02wf9ljy6.execute-api.us-east-1.amazonaws.com/PROD",
            params:{'restaurantId':restaurantId}
          }).then((response)=>{
              console.log(id);
              //console.log(response.data.data);
            setFoodItems(response.data.data);
            // console.log(response.data.data);
            // setIsLoading(false);
          }).catch((error)=>{
            alert(error);
            // setIsLoading(false);
          });
      }
      fetchData();
    },[]);
    
    return (
      <div>
        <h1 className="text-center">Feedback Page</h1>
        <div>
          <h5>{nullOrders}</h5>
          <FeedbackItem foodItems={foodItems} restaurantId={restaurantId}/>
        </div>
      </div>
    );

}

export default withRouter(FeedbackPage);