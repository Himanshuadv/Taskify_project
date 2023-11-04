import React from 'react'
import './CSS/SignupPage.css'
import Signup from '../Components/Signup/Signup'
import logo_img from '../Components/Assets/logo.jpeg'

const SignupPage = () => {
  return (
    <div className='signupPage'>
        <div className="signup-container">
            <img src={logo_img} alt=''/>
            <Signup />
        </div>
    </div>
  )
}

export default SignupPage
