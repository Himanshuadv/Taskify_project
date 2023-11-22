import React, { useState } from 'react';
import Navbar from '../Components/Home Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import Canvas from '../Components/Canvas/Canvas';

const CanvasPage = () => {

    const [height, setHeight] = useState(800);
    const [width, setWidth] = useState(800);

    setHeight(height);
    setWidth(width);

    return(
        <div className="canvas-container">
            <Navbar />

            <Canvas height={height} width={width}  />

            <Footer />
        </div>
    )
}

export default CanvasPage;