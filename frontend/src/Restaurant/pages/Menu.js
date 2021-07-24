import Navbar from "../components/Navbar";
import "../css/Menu.css"
import React, {useEffect, useState} from "react";
import {Card,Button} from 'react-bootstrap';
import { PlusSquareFill,PencilSquare,TrashFill } from 'react-bootstrap-icons';
import {useHistory,useLocation } from "react-router-dom"; 
import axios from 'axios';
import { Spinner } from "react-bootstrap";

const Menu = () => {

  let location = useLocation();
  const [menuItems,setMenuItems] = useState([]);
  const [restaurantDetails,setRestaurantDetails] = useState(location.state.restaurantDetails);
  // const [restaurantId,setRestaurantId] = useState(0);
  const history = useHistory();
  
  const [isLoading,setIsLoading] = useState(true);


  useEffect(() => {
    // setRestaurantId(restaurantDetails.resid);
    // console.log(restaurantDetails);
    fetchMenuItems();
  }, []);

  async function fetchMenuItems(){
    setIsLoading(true);
    await axios({
      method:"get",
      url:"https://x02wf9ljy6.execute-api.us-east-1.amazonaws.com/PROD",
      params:{'restaurantId':restaurantDetails.resid}
    }).then((response)=>{
      setMenuItems(response.data.data);
      // console.log(response.data.data);
      setIsLoading(false);
    }).catch((error)=>{
      alert(error);
      setIsLoading(false);
    });
  }

  function addMenuItem() {
    let item = {name:"",Id:0,ingredients:"",price:0,restaurantId:restaurantDetails.resid} 
    console.log(item);
    history.push({
      pathname:'/menuItem/Add',
      state: {menuItem:item,isEdit:false }
    });
  }

  function editMenuItem(id) {
    // alert("EditItem called");
    let item = menuItems.filter((item)=> item.Id === id);
    history.push({
      pathname:'/menuItem/' + id,
      state: {menuItem:item[0],isEdit:true }
    });
  }

  async function removeMenuItem(id) {
    setIsLoading(true);
    await axios({
      method:"delete",
      url:" https://olwcwrho8c.execute-api.us-east-1.amazonaws.com/PROD",
      params:{'Id':id}
    }).then((response)=>{
      alert(response.data.message);
      // console.log(response.data.data);
      fetchMenuItems();
      setIsLoading(false);
    }).catch((error)=>{
      alert(error);
      setIsLoading(false);
    });
  }

  return (
    <div>
      <Navbar restaurantDetails={restaurantDetails}></Navbar>
      <div className="outer">      
      <div className="inner">
      <div className="icon">
        <Button onClick={addMenuItem}>
        <PlusSquareFill  size={20}/>
        </Button>
          
          {/* <PencilSquare style={{ marginLeft: '.5rem' }} size={20}/> */}
        </div>
        <Spinner animation="border" size="lg" style={{display:'flex',justifyContent:'flex-center', visibility:(isLoading ? "visibile" : "collapse") }} />
      { menuItems.map((r)=>{
            return(
                <div  className="col-3 m-1 picture-card" key={r.Id} >
                    <Card className="card">
                    <Card.Img className="card-img" variant="top" src={r.imgUrl}    />
                    <Card.Body style={{width:"100%"}}>
                    <div className="icon">
                        <a onClick={() => editMenuItem(r.Id)}>
                          <PencilSquare  size={20}/>
                        </a>
                        <a onClick={() => removeMenuItem(r.Id)}>
                          <TrashFill style={{ marginLeft: '.5rem' }} size={20}/>
                        </a>
                      </div>
                      <Card.Title>{r.name}</Card.Title>

                        <Card.Text><b>Price:</b> {r.price}
                        <br/>
                        <b>Ingredients:</b> {r.ingredients.split(',').map((i)=>{return(i + " | ")})} 
                        <br/>
                        </Card.Text>
                    </Card.Body>
                    </Card>
                </div>       
            )
        })}
    </div>

      </div>
      
    </div>

  );
};

export default Menu;
