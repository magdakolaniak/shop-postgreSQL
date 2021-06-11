import { Row, Col, Nav } from 'react-bootstrap';
import '../styles/css/footer.css';
import { FaFacebook } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import { ImYoutube2 } from 'react-icons/im';
import { GiHummingbird } from 'react-icons/gi';

const Footer = () => {
  return (
    <footer className="d-flex justify-content-center fixed-bottom footer-style">
      <Row className="w-75">
        <Col>
          <Row className="justify-content-center">
            <FaFacebook className="icons" />
            <FiInstagram className="icons" />
            <ImYoutube2 className="icons" />
            <GiHummingbird className="icons" />
          </Row>

          <Nav.Link className="footer-links ">Media Center</Nav.Link>
          <Nav.Link className="footer-links ">Privacy</Nav.Link>
        </Col>

        <Col>
          <p></p>
          <Nav.Link className="footer-links ">Description</Nav.Link>
          <Nav.Link className="footer-links ">Investor Relations</Nav.Link>
        </Col>
        <Col>
          <p></p>
          <Nav.Link className="footer-links ">Help Center</Nav.Link>
          <Nav.Link className="footer-links ">Jobs</Nav.Link>
        </Col>
        <Col>
          <p></p>
          <Nav.Link className="footer-links ">Gift Cards</Nav.Link>
          <Nav.Link className="footer-links ">Terms Of Use</Nav.Link>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
