import React from 'react';
import Navbar from '../Components/Home Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import Canvas from '../Components/Canvas/Canvas';

const CanvasPage = () => {

    const height = 800;
    const width = 800;

    return(
        <div className="canvas-container">
            <Navbar />

            <Canvas height={height} width={width}  />

            <Footer />
        </div>
    )
}

export default CanvasPage;