import Navbar from "../Components/Home Navbar/Navbar"
import Footer from '../Components/Footer/Footer'
import Hero from '../Components/Hero/Hero'
import Column from '../Components/Tasks Column/Column'
import './CSS/Home.css'

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

export default Home;