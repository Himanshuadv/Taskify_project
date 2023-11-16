import React from 'react'
import './Footer.css'
import { MdTaskAlt } from 'react-icons/md'
import {BiLogoFacebookCircle, BiPointer} from 'react-icons/bi'
import {BsInstagram} from 'react-icons/bs'
import {BsTwitter} from 'react-icons/bs'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-top">
        <div className="footer-top-left">
            <MdTaskAlt size={50} color='#232222'/>
            <h2>Taskify</h2>
            <p>Simplify Your Productivity. Get organized and boost efficiency with notes and to-do lists</p>
        </div>
        <div className="footer-top-right">
            <p>Follow us on</p>
            <div className="social-media-icons">
                <div className="facebook-icon">
                    <BiLogoFacebookCircle size={36} color='#232222'/>
                </div>
                <div className="instagram-icon">
                    <BsInstagram size={28} color='#232222'/>
                </div>
                <div className="twitter-icon">
                    <BsTwitter size={30} color='#232222'/>
                </div>
            </div>
        </div>
      </div>
      <div className="footer-line"></div>
      <div className="footer-bottom">
        <p>© 2023 Taskify Inc.</p>
        <ul>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Cookies</li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
