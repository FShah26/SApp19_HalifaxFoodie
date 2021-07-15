
import Navbar from "../components/Navbar";
import food from "../images/food-background.jpg";
import "../css/Menu.css"
import React, {useEffect, useState} from "react";
import {Card,Button} from 'react-bootstrap';
import { useHistory } from 'react-router';
import Axios from 'axios';
import { PlusSquareFill,PencilSquare,TrashFill } from 'react-bootstrap-icons';

const menu = require('../data/Menu');
const Menu = () => {
  
  const [menuItems,setMenuItems] = useState(menu);
  const history = useHistory();


  useEffect(() => {
    setMenuItems(menuItems);
  }, [menuItems]);

  function addMenuItem() {
    alert("AddItem called");
  }

  function editMenuItem(id) {
    alert("EditItem called");
  }

  function removeMenuItem(id) {
    const itemIdx = menuItems.findIndex((item)=> item.id === id);
    menuItems.splice(itemIdx,1);
    //Call menuItem delete api
    setMenuItems([...menuItems]);    
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="outer">      
      <div className="inner">
      <div className="icon">
        <Button onClick={addMenuItem}>
        <PlusSquareFill  size={20}/>
        </Button>
          
          {/* <PencilSquare style={{ marginLeft: '.5rem' }} size={20}/> */}
        </div>
      { menuItems.map((r)=>{
            return(
                
                <div  className="col-2 s-1 picture-card" key={r.id} >
                    <Card>
                    <Card.Img variant="top" src={r.picture}  style={{height:"75%"}}  />
                    <Card.Body>
                    <div className="icon">
                        <a onClick={() => editMenuItem(r.id)}>
                          <PencilSquare  size={20}/>
                        </a>
                        <a onClick={() => removeMenuItem(r.id)}>
                          <TrashFill style={{ marginLeft: '.5rem' }} size={20}/>
                        </a>
                      </div>
                        <Card.Title>{r.title}. {r.firstName} {r.lastName} </Card.Title>
                        <Card.Text>{r.email}</Card.Text>
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
