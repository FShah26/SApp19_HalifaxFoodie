import Navbar from "../components/Navbar";
import "../css/Menu.css"
import React, {useEffect, useState} from "react";
import { useLocation,useHistory } from "react-router-dom";
// import {Card,Button} from 'react-bootstrap';
// import { PlusSquareFill,PencilSquare,TrashFill } from 'react-bootstrap-icons';

const MenuItem = (props) => {

    const location = useLocation();
    const [menuItem,setMenuItem] = useState([]);
    let history = useHistory();


  useEffect(() => {
      console.log(location.state.menuItem);
    setMenuItem(location.state.menuItem);
  }, [location]);

  function saveMenuItem() {
    // console.log("menuItem Saved!");
        
  }



  return (
    <div>
      <Navbar></Navbar>
      <div className="outer">      
      <div className="inner">
                <div>
                <h1>Add MenuItem</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input className="form-control" placeholder="*First Name"  type="text" id="firstName" value={menuItem.strMeal}  /><br/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input className="form-control" placeholder="*Last Name" type="text" id="lastName" value={menuItem.strCategory} /><br/>
                    </div>
                    <div className="form-group">  
                        <label htmlFor="email">Email</label>
                        <input className="form-control" placeholder="*Email" type="email" id="email" value={menuItem.price} /><br/>
                    </div>
                    <div className="form-group"> 
                        <button type="button" className="btn btn-primary" onClick={()=>saveMenuItem()}>Save</button>
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
