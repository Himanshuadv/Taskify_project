import React from 'react';
import Navbar from '../Components/Home Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import Canvas from '../Components/Canvas/Canvas';

const CanvasPage = () => {
    return(
        <div className="canvas-container">
            <Navbar />

            <Canvas height="800" width="1192"  />

            <Footer />
        </div>
    )
}

export default CanvasPage;