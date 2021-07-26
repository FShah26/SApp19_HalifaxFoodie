import Navbar from "../components/Navbar";
import "../css/Menu.css"
import React, {useEffect, useState} from "react";
import { useLocation,useHistory } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import axios from 'axios';

// import {Card,Button} from 'react-bootstrap';
// import { PlusSquareFill,PencilSquare,TrashFill } from 'react-bootstrap-icons';

const MenuItem = (props,{restaurantDetails}) => {

    const location = useLocation();
    const [menuItem,setMenuItem] = useState([]);
    const [isEdit,setIsEdit] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    let history = useHistory();


  useEffect(() => {
      console.log(location.state.menuItem);
    setMenuItem(location.state.menuItem);
    setIsEdit(location.state.isEdit);
  }, []);

  async function saveAddedItem()
  {
    setIsLoading(true);
    console.log(menuItem);
    await axios({
      method:"post",
      url:"https://olwcwrho8c.execute-api.us-east-1.amazonaws.com/PROD",
      data:{
        'restaurantId':menuItem.restaurantId,
        'name':menuItem.name,
        'price':menuItem.price,
        'ingredients':menuItem.ingredients
      }
    }).then((response)=>{
      alert(response.data.message);
      setIsLoading(false);
    }).catch((error)=>{
      alert(error);
      setIsLoading(false);
    });
  }

  async function saveEditedItem()
  {
    setIsLoading(true);
    console.log(menuItem);
    await axios({
      method:"put",
      url:"https://olwcwrho8c.execute-api.us-east-1.amazonaws.com/PROD",
      params:{'Id':menuItem.Id},
      data:{
        'name':menuItem.name,
        'price':menuItem.price,
        'ingredients':menuItem.ingredients,
      }
    }).then((response)=>{
      alert(response.data.message);
      setIsLoading(false);
    }).catch((error)=>{
      alert(error);
      setIsLoading(false);
    });
  }

  async function saveMenuItem() {
    if(isEdit)
    {
      await saveEditedItem();
      history.push("/restaurantHome")
    }
    else
    {
      await saveAddedItem();
      history.push("/restaurantHome");
    }
        
  }

  function handleChange(evt){
    const value = evt.target.value;
    setMenuItem({
    ...menuItem,
    [evt.target.name]: value
  });
  }



  return (
    <div>
      {/* <Navbar restaurantDetails={restaurantDetails}></Navbar> */}
      <div className="outer">      
      <div className="inner">
                <div>
                <h1>{isEdit ? 'Edit' : 'Add'} Item</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="firstName">Name</label>
                        <input className="form-control" placeholder="*Name"  type="text" id="name" name="name" value={String(menuItem.name)} onChange={handleChange}  /><br/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Ingredient (add comma separated values)</label>
                        <input className="form-control" placeholder="*Ingredients" type="text" id="ingredients" name="ingredients" value={String(menuItem.ingredients)} onChange={handleChange} /><br/>
                    </div>
                    <div className="form-group">  
                        <label htmlFor="email">Price</label>
                        <input className="form-control" placeholder="*Price" type="text" pattern="[0-9]*" id="price" name="price" value={menuItem.price} onChange={handleChange}/><br/>
                    </div>
                    <div className="form-group"> 
                        <button type="button" className="btn btn-primary" onClick={()=>saveMenuItem()}>Save</button>
                        <Spinner animation="border" size="lg" style={{display:'flex',justifyContent:'flex-center', visibility:isLoading ? 'visibile' : 'collapse' }} />
                    </div>
                    
                    <div className="form-group"> 
                        <button type="button" className="btn btn-primary" onClick={()=> history.goBack()} >Cancel</button>
                    </div>
                </form>
            </div>
      </div>
      </div>
    </div>

  );
};

export default MenuItem;
