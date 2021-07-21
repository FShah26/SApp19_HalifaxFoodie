import Navbar from "../components/Navbar";
import "../css/Menu.css"
import React, {useEffect, useState} from "react";
import {Card,Button} from 'react-bootstrap';
import { PlusSquareFill,PencilSquare,TrashFill } from 'react-bootstrap-icons';
import {useHistory} from "react-router-dom"; 

const Menu = () => {
  
  const [menuItems,setMenuItems] = useState(menu);
  const [show, setShow] = useState(false);
  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    setMenuItems(menuItems);
  }, [menuItems]);

  function addMenuItem() {
    alert("AddItem called");
  }

  function editMenuItem(id) {
    // alert("EditItem called");
    let item = menuItems.filter((item)=> item.idMeal === id);
    history.push({
      pathname:'/menuItem/' + id,
      state: {menuItem:item[0] }
    });
  }

  function removeMenuItem(id) {
    const itemIdx = menuItems.findIndex((item)=> item.idMeal === id);
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
                <div  className="col-3 m-1 picture-card" key={r.idMeal} >
                    <Card className="card">
                    <Card.Img className="card-img" variant="top" src={r.strMealThumb}    />
                    <Card.Body style={{width:"100%"}}>
                    <div className="icon">
                        <a onClick={() => editMenuItem(r.idMeal)}>
                          <PencilSquare  size={20}/>
                        </a>
                        <a onClick={() => removeMenuItem(r.idMeal)}>
                          <TrashFill style={{ marginLeft: '.5rem' }} size={20}/>
                        </a>
                      </div>
                      <Card.Title>{r.strMeal}</Card.Title>

                        <Card.Text><b>Price:</b> {r.price}
                        <br/>
                        <b>Category:</b> {r.strCategory}
                        <br/>
                        <b>Ingredients:</b> {r.strIngredient1} | {r.strIngredient2} | {r.strIngredient3} | {r.strIngredient4} | {r.strIngredient5}
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
