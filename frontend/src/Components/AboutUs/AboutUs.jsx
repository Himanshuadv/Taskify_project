import React, { useState } from 'react';
import IndividualIntervalsExample from '../IndividualIntervalExample';
import './AboutUs.css';

// const DesignerInfo = ({ name, image }) => {
//   return (
//     <div className="designer-info">
//       <div className="designer-image">
//         <img src={image} alt={`${name} Image`} />
//       </div>
//       <p className="designer-name">{name}</p>
//     </div>
//   );
// };

const FeatureDropdown = ({ feature, image, description }) => {
  return (
    <div className="feature-dropdown">
      <img src={image} alt={`${feature} Example`} className="feature-image" />
      <p className="feature-description">{description}</p>
    </div>
  );
};

const AboutUs = () => {
  const [dropdownIndex, setDropdownIndex] = useState(null);

  const designers = [
    { name: 'Dhruv Rastogi', image: './Assets/monkey.jpg' },
    { name: 'Dheeraj Sharma', image: './Assets/monkey.jpg' },
    { name: 'Himanshu Tripathi', image: './Assets/monkey.jpg' },
  ];

  const features = [
    { name: 'To-Do Lists', image: 'todo-image.jpg', description: 'Manage your tasks with to-do lists.' },
    { name: 'Dailies', image: 'daily-image.jpg', description: 'Keep track of daily activities.' },
    { name: 'Habits', image: 'habit-image.jpg', description: 'Develop and track habits for productivity.' },
    { name: 'Notes', image: 'note-image.jpg', description: 'Take notes and stay organized.' },
    { name: 'Canvases', image: 'canvas-image.jpg', description: 'Express your ideas with creative canvases.' },
    // Add more features as needed
  ];

  const handleFeatureClick = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  return (
    <div className="about-us-container">
      <h1 className="about-us-header">About Us</h1>
      <p className="about-us-intro">Welcome to Taskify, your all-in-one productivity solution!</p>

      <h2 className="designed-by-header">Designed By</h2>
      <div className="designer-list">
      <IndividualIntervalsExample name={designers} />
        {/* {designers.map((designer, index) => (
          <DesignerInfo key={index} name={designer.name} image={designer.image} />
        ))} */}
      </div>

      <h2 className="features-header">Features</h2>
      <p className="features-description">Taskify supports a variety of productivity tools to help you stay organized:</p>
      <ul className="features-list">
        {features.map((feature, index) => (
          <li key={index} className="feature-item">
            <div className="feature-header" onClick={() => handleFeatureClick(index)}>
              {feature.name}
            </div>
            {dropdownIndex === index && (
              <FeatureDropdown
                feature={feature.name}
                image={feature.image}
                description={feature.description}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutUs;
