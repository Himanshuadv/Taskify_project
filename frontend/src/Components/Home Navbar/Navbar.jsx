import React, { useState } from 'react'
import './Navbar.css'
import logo from "../Assets/main-logo.jpeg"
import { AiOutlineUser } from 'react-icons/ai'
import { LuMessageSquare } from 'react-icons/lu'

const Navbar = () => {
  const [clicked, setClicked] = useState('');

  const handleItemClick = (item) => {
    setClicked(item);
  }

  return (
    <div className='navbar'>
      <div className="home-nav-left">
        <div className="home-logo">
          <h2>Taskify</h2>
        </div>
        <div className="home-nav-left-items">
          <ul>
            <li onClick={() => handleItemClick('notes')} className={clicked === 'notes' ? 'clicked' : ''}>Notes</li>
            <li onClick={() => handleItemClick('todo')} className={clicked === 'todo' ? 'clicked' : ''}>To-Do</li>
          </ul>
        </div>
      </div>
      <div className="home-nav-right">
        <div className="msg-icon">
        <LuMessageSquare size={30} />
        <div className="msg-icon-tooltip">
            Messages
        </div>
        </div>
        <div className="user-icon">
        <AiOutlineUser size={30} />
        <div className="user-icon-tooltip">
            User
        </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
