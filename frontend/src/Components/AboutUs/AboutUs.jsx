import React, { useState } from 'react';
import './AboutUs.css';
import Header from '../AboutUsHeader/Header';
import Monkey from '../Assets/monkey.jpg';
import Rhino from '../Assets/rhino.jpg';
import Lion from '../Assets/lion.jpg';

const DesignerCarousel = ({ designers }) => {
  const [index, setIndex] = useState(0);
  setIndex(index);

  // const handleSelect = (selectedIndex, e) => {
  //   setIndex(selectedIndex);
  // };

  return (
    <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {designers.map((designer, idx) => (
          <div key={idx} className={`carousel-item${idx === 0 ? ' active' : ''}`} data-bs-interval="2000">
            <img src={designer.image} className="d-block w-100 carousel-image" alt={`Slide ${idx}`} />
            <div className="carousel-caption d-none d-md-block">
              <h5>{designer.name}</h5>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden" onClick={() => setIndex(index - 1)}>Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden" onClick={() => setIndex(index + 1)}>Next</span>
      </button>
    </div>
  );
};

function FeatureAccordion({ features }) {
  return (
    <div>
      {features.map((feature, index) => (
        <div key={index} className="accordion" id={`accordionFeature${index}`}>
          <div className="accordion-item">
            <h2 className="accordion-header" id={`headingFeature${index}`}>
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseFeature${index}`} aria-expanded="true" aria-controls={`collapseFeature${index}`}>
                {feature.name}
              </button>
            </h2>
            <div id={`collapseFeature${index}`} className={`accordion-collapse collapse${index === 0 ? ' show' : ''}`} aria-labelledby={`headingFeature${index}`} data-bs-parent={`#accordionFeature${index}`}>
              <div className="accordion-body">
                <img src={feature.image} alt={`${feature.name} Example`} className="feature-image" />
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const AboutUs = () => {
  const designers = [
    { name: 'Dhruv Rastogi', image: Lion },
    { name: 'Dheeraj Sharma', image: Rhino },
    { name: 'Himanshu Tripathi', image: Monkey },
  ];

  const features = [
    { name: 'To-Do Lists', image: 'todo-image.jpg', description: 'Manage your tasks with to-do lists.' },
    { name: 'Dailies', image: 'daily-image.jpg', description: 'Keep track of daily activities.' },
    { name: 'Habits', image: 'habit-image.jpg', description: 'Develop and track habits for productivity.' },
    { name: 'Notes', image: 'note-image.jpg', description: 'Take notes and stay organized.' },
    { name: 'Canvases', image: 'canvas-image.jpg', description: 'Express your ideas with creative canvases.' },
  ];

  return (
    <div className="about-us-container">
      <Header />
      <p className="about-us-intro">Welcome to Taskify, your all-in-one productivity solution!</p>

      <h2 className="designed-by-header">Designed By</h2>
      <DesignerCarousel designers={designers} />

      <h2 className="features-header">Features</h2>
      <p className="features-description">Taskify supports a variety of productivity tools to help you stay organized:</p>
      <FeatureAccordion features={features} />
    </div>
  );
};

export default AboutUs;
