import Carousel from 'react-bootstrap/Carousel';
import Monkey from './Assets/monkey.jpg';

function IndividualIntervalsExample(props) {
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <img
        style={{
            width: "100px",
            height: "100px",
        }}
        className="d-block w-100"
        src={Monkey}
        alt="First Slide"
        />
        <Carousel.Caption>
          <h3></h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img 
        style={{
            width: "100px",
            height: "100px",
        }}
        className="d-block w-100"
        src={Monkey}
        alt="Second Slide"
        />
        <Carousel.Caption>
          <h3></h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img 
        style={{
            width: "100px",
            height: "100px",
        }}
        className="d-block w-100"
        src={Monkey} 
        alt="Third Slide"
        />
        <Carousel.Caption>
          <h3></h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default IndividualIntervalsExample;