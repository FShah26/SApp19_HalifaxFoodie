import { useState, useEffect } from "react";
import { withRouter } from "react-router";
import OrderItem from "./OrderItem";
import axios from "axios";

const OrderHistory = () => {
  const url = "https://8vzigpka97.execute-api.us-east-1.amazonaws.com/api/orderHistory";

  // Here this will be converted to post request to post
  // the userID which is logged in and get it order details

  const [orders, setOrders] = useState({});
  const [nullOrders, setnullOrders] = useState("");
  useEffect(() => {
    async function fetchData() {
      await axios.get(url).then((res) => {
        //console.log("results" + JSON.stringify(res));
        if (res.status === 200) {
          setOrders(res.data.data);
          console.log(res.data.data);
        } else if (res.status === 500) {
          console.log("server error");
        } else if (res.status === 204) {
          setnullOrders("No previous orders found");
        }
      });
    }
    fetchData();
  },[]);
  
  return (
    <div>
      <h1 className="text-center">Order History</h1>
      <div>
        <h5>{nullOrders}</h5>
        <OrderItem orders={orders}/>
      </div>
    </div>
  );
};

export default withRouter(OrderHistory);
