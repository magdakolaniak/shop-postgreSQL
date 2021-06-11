import { Navbar, Nav, FormControl, Button } from 'react-bootstrap';
import '../styles/css/pagenavbar.css';
import { Link } from 'react-router-dom';

import logo2 from '../assets/logo2.png';

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" className="fixed-top">
      <Navbar.Brand as={Link} to="/welcome">
        <img src={logo2} alt="" className="amazon-logo" />
        Store
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/Welcome">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/LatestReleases">
          Display all products
        </Nav.Link>
        <Nav.Link>About</Nav.Link>
        <Nav.Link as={Link} to="/backoffice">
          Add your own
        </Nav.Link>
      </Nav>
      <Nav>
        {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
        {/* <Button variant="outline-success">Search</Button> */}
      </Nav>
    </Navbar>
  );
};

export default Navigation;
