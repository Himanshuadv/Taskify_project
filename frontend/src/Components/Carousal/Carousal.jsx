import React, { useState } from "react";
import "./Carousal.css";

function Carousal(props) {
  const [image, setImage] = useState(1);

  const handlePreviousClicked = () => {
    setImage(image > 0 ? image - 1 : props.img1.length - 1);
  };

  const handleNextClicked = () => {
    setImage(image < props.img1.length - 1 ? image + 1 : 0);
  };

  return (
    <div className="carousal-container">
      <div 
      className="carousal-image"
      style={{backgroundImage:`url(${props.img1[image]})`}}
      >
        {/* <img src={props.img1[image]} alt="Image" /> */}
      </div>
      <div className="carousal-text">
        <h2 className="carousal-text-header">Title</h2>
        <p className="carousal-text-body">This is a text.</p>
      </div>
      <div className="carousal-button">
        <span
          className="carousal-previous-button"
          onClick={handlePreviousClicked}
          style={{ cursor: "pointer" }}
        >
          Previous
        </span>
        <span className="carousal-next-button" onClick={handleNextClicked}>
          Next
        </span>
      </div>
    </div>
  );
}

export default Carousal;
