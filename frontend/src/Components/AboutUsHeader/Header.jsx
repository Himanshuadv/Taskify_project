import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";
import {IoArrowBackOutline} from 'react-icons/io5';
import {MdTaskAlt} from 'react-icons/md'


const Header = () => {
  const aboutCols = [
    {
      imgSrc: 'img/about-mission.webp',
      iconBgColor: '#3C5A99',
      iconBorderColor: '#fff',
      iconColor: '#fff',
      iconName: 'ion-ios-speedometer-outline',
      title: 'Our Mission',
      description: 'To utilize the power of technology in setting and reaching goals...',
    },
    {
      imgSrc: 'img/about-plan.webp',
      iconBgColor: '#3C5A99',
      iconBorderColor: '#fff',
      iconColor: '#fff',
      iconName: 'ion-ios-list-outline',
      title: 'Our Plan',
      description: 'We plan to integrate Artificial Intelligence to hitting your set targets.',
    },
    {
      imgSrc: 'img/about-vision.webp',
      iconBgColor: '#3C5A99',
      iconBorderColor: '#fff',
      iconColor: '#fff',
      iconName: 'ion-ios-eye-outline',
      title: 'Our Vision',
      description: 'To see you achieve more success in reaching more of your goals with Iris Goal Tracker.',
    },
  ];

  return (
    <section id="about-page-section">
    <div className="about-nav">
        <div className="about-nav-left">
          <div className="about-logo">
            <MdTaskAlt size={50}/>
            <h2>Taskify</h2>
          </div>
          <div className="about-nav-left-items">
            <ul>
            <li><Link to='/signup'>Get Started</Link></li>
              <li>Contact Us</li>
              <li className='about-clicked'><Link to='/aboutus'>About Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="about-nav-right">
  <Link to='/signin' className="your-link-styles">Login</Link>
</div>
      </div>
    {/* <Link to="/" ><span className="back-to-landing" ><IoArrowBackOutline size={28} /></span></Link> */}

      <div className="about-page-container">
        <header className="about-section-header">
          <h1>About Us</h1>
          <p>
          We are Chakra Coders, a collaborative team of skilled developers, and designers participating in the CodeSangam Hachathon. In our journey, we introduced Taskify, an innovative project aimed at revolutionizing task management. Since its inception, Taskify has been our flagship product, marking our commitment to creating impactful solutions. Launched with passion and dedication, Taskify embodies the essence of effective goal tracking, aligning with Mark Victor Hansen's wisdom: "By recording your dreams and goals, you set in motion the process of becoming the person you most want to be." As Chakra Coders, we strive to bring a harmonious blend of creativity and technical expertise to every project, fostering growth and success.
          </p>
        </header>

        <div className="about-section-row">
          {aboutCols.map((col, index) => (
            <div key={index} className="about-section-column">
              {/* <div className="about-section-col">
                <div className="about-section-img">
                  <img src={col.imgSrc} alt=""/>
                  <div className="about-section-icon">
                    <i className="about-section-icon-img"></i>
                  </div>
                </div>
                <h2 className="about-section-title">
                  {col.title}
                </h2>
                <p className="about-section-text-center">
                  {col.description}
                </p>
              </div> */}
              <div class="about-flip-card">
                <div class="about-flip-card-inner">
                    <div class="about-flip-card-front">
                        <p class="about-title-title">{col.title}</p>
                        {/* <p>ChakraCoders</p> */}
                    </div>
                    <div class="about-flip-card-back">
                        <p class="about-title">{col.description}</p>
                        {/* <p></p> */}
                    </div>
                </div>
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Header;
