
import Navbar from "../Components/Home Navbar/Navbar"




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
