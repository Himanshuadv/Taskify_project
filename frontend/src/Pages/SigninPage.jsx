import React from 'react'
import './CSS/SigninPage.css'
import Signin from '../Components/Signin/Signin'
import logo_img from '../Components/Assets/logo.jpeg'

const SigninPage = () => {
  return (
    <div className='signinPage'>
      <div className="signin-container">
            <img src={logo_img} alt=''/>
            <Signin />
        </div>
    </div>
  )
}

export default SigninPage
