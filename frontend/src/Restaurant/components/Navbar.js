import {Navbar,Nav} from 'react-bootstrap';

function AppNavBar() {
  return (
    <div className="App">
      <Navbar collapseOnSelect expand="lg" bg="dark"  variant="dark">
            <Navbar.Brand href="/restaurantHome">
                {/* <img src={logo} className="d-inline-block align-top" height="150"/> */}
                RestaurantName <sub>HalifaxFoodie</sub>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="container-fluid">
                    <Nav.Link href="/restaurantMenu">Menu</Nav.Link>
                    <Nav.Link href="/promocodes">Promocodes</Nav.Link>
                    <Nav.Link href="/recipes">Recipe</Nav.Link>
                    <Nav.Link eventKey={2} href="/logout" className="ml-auto">Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default AppNavBar;
