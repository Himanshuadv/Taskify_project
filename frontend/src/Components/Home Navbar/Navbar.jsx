import React from 'react';
import './Navbar.css';
import { AiOutlineUser } from 'react-icons/ai';
import { LuMessageSquare } from 'react-icons/lu';
import { MdTaskAlt } from 'react-icons/md';
import {AiOutlineLogout} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context';

const Navbar = () => {
  const { clicked, setClicked } = useAppContext();
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    setClicked(item);
  };
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        navigate('/')
      } else {
        const data = await response.json();
        alert(data.error);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className='navbar'>
      <div className="home-nav-left">
        <div className="home-logo">
          <MdTaskAlt size={38} />
          <h2>Taskify</h2>
        </div>
        <div className="home-nav-left-items">
          <ul>
            <Link to='/home'>
              <li onClick={() => handleItemClick('tasks')} className={clicked === 'tasks' ? 'clicked' : ''}>
                Tasks
              </li>
            </Link>
            <Link to='/notes'>
              <li onClick={() => handleItemClick('notes')} className={clicked === 'notes' ? 'clicked' : ''}>
                Notes
              </li>
            </Link>
<<<<<<< HEAD
            <Link to='/canvas-generator'>
              <li onClick={() => handleItemClick('canvas')} className={clicked === 'canvas' ? 'clicked' : ''}>
                Canvas
              </li>
            </Link>
=======
>>>>>>> 00d214fab0d8c14484db942029a128cbfbcdac25
          </ul>
        </div>
      </div>
      <div className="home-nav-right">
        <div className="msg-icon">
          <LuMessageSquare size={30} />
          <div className="msg-count">1</div>
          <div className="msg-icon-tooltip">Messages</div>
        </div>
        <div className="user-icon">
          <AiOutlineUser size={30} />
          <div className="user-icon-tooltip">User</div>
        </div>
        <div className="logout-icon">
          <AiOutlineLogout size={30} onClick={handleLogout}/>
          <div className="logout-icon-tooltip">Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
