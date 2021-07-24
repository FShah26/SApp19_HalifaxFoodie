import React,{useState} from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import UserPool from "../../Utils/UserPool";
import { useHistory,Link } from "react-router-dom";
import {
  EMAIL_KEY,
  MFA_KEY,
  PROFILE_KEY,
  USER_PROFILE,
} from "../../Utils/AccountUtils";

function AppNavBar({restaurantDetails}) {
  
  const history = useHistory();
  const profile = localStorage.getItem(PROFILE_KEY);
  const userName = localStorage.getItem(EMAIL_KEY);

  const logOut = () => {
    const isUserThere = UserPool.getCurrentUser();
    if (isUserThere) {
      localStorage.removeItem(EMAIL_KEY);
      localStorage.removeItem(MFA_KEY);
      isUserThere.signOut();
      history.push("login");
    }
  };

  const initiateChat = () => {
    // console.log("User",userName)
    // console.log("Restaurant",restaurantName)
    history.push({
      pathname:'/chat',
      state: {role:profile,restaurantName:userName,userName:"" }
    });
  };


  return (
    <div className="App">
      <Navbar collapseOnSelect expand="lg" bg="dark"  variant="dark">
            <Navbar.Brand href="/restaurantHome">
                {/* <img src={logo} className="d-inline-block align-top" height="150"/> */}
                {restaurantDetails.resname} <sub>HalifaxFoodie</sub>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="container-fluid">
                    <Nav.Link as={Link} to={{
                      pathname:"/restaurantMenu",
                      state:{restaurantDetails:restaurantDetails},
                    }} 
                    >Menu</Nav.Link>
                    <Nav.Link href="/promocodes">Promocodes</Nav.Link>
                    <Nav.Link href="/recipes">Recipe</Nav.Link>
                    <Nav.Link href="#" onClick={initiateChat}>Get Online</Nav.Link>
                    <Nav.Link eventKey={2} href="#" onClick={logOut} className="ml-auto">Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default AppNavBar;
