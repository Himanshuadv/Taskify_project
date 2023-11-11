
import Navbar from "../Components/Home Navbar/Navbar"
import Footer from '../Components/Footer/Footer'
import Hero from '../Components/Hero/Hero'
import Column from '../Components/Tasks Column/Column'
import './CSS/Home.css'

<<<<<<< HEAD
const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <Hero />
      <div className="tasks-columns">
      <Column />
      <Column />
      <Column />
      <Column />
      </div>
      <Footer />
    </div>
  )
}
=======
>>>>>>> origin/dheeraj



//now fetching data from backend checking 

import React, { useEffect,useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [maxwell, setMaxwell] = useState(null)
  const location = useLocation();
  const token = location?.state?.token;
  console.log("This is token -> " + token);
  useEffect(() => {
   if(token){
    fetchData(token);
   }
  }, []); // <-- Use [token] in the dependency array
 
  const fetchData = async (token) => {
    try {
      const res = await axios.get("http://localhost:8000/api/todos", {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
 
      console.log(res.data);
      setMaxwell(res.data.message); // Update state with response data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  return <div>{maxwell}
    <Navbar/>
  </div>;
};

export default Home;
