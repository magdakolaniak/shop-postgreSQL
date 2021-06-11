import { Jumbotron, Container } from 'react-bootstrap';
import '../styles/css/welcome.css';

const Welcome = () => {
  return (
    <Jumbotron className="fluid d-flex justify-content-center align-items-center mb-0">
      <Container className="mt-5"></Container>
    </Jumbotron>
  );
};

export default Welcome;
