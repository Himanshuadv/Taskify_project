import React from "react";
import AboutUs from "../Components/AboutUs/AboutUs";
import Footer from "../Components/Footer/Footer";
import IndividualIntervalsExample from "../Components/IndividualIntervalExample";

export default function AboutUsPage(){
    return(
        <div className="about-us-page">
            <IndividualIntervalsExample />
            <Footer />
        </div>
    );
}