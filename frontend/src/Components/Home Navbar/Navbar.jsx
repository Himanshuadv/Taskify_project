import React, {useState, useEffect} from 'react';
import './Navbar.css';
import {PiSignOut} from 'react-icons/pi';
import { AiOutlineUser } from 'react-icons/ai';
import { LuMessageSquare } from 'react-icons/lu';
import { MdTaskAlt } from 'react-icons/md';
import {AiOutlineClose} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context';
import Message from '../Message/Message';
import {useTaskContext} from '../TaskContext';
import {IoMdMenu} from 'react-icons/io'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {fetchNotifications, notifications} = useTaskContext();
  const { clicked, setClicked } = useAppContext();
  const [msgClicked,setMsgClicked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileClicked, setProfileClicked] = useState(false);
  const navigate = useNavigate();

  const handleDeleteNotification = async () => {
    try {
      const response = await fetch("http://localhost:8000/delete-notifications", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 204) {
        console.log("Delete notification successfully");
        fetchNotifications();
      } else {
        console.log(`Failed to fetch user. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:8000/get-user-profile", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setName(data.user.name);
        setEmail(data.user.email);
      } else {
        console.log(`Failed to fetch user. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchNotifications();
  },[]);

  const handleItemClick = (item) => {
    setClicked(item);
  };
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/logout", {
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

  const handleMsgCount = async () => {
    if(notifications.length > 0) {
      return notifications.length;
    }
    return '';
  };

  return (
    <div className='navbar'>
      <div className="home-nav-left">
      <div className="menu-btn" onClick={()=>{setMenuOpen(!menuOpen)}} >
          <IoMdMenu size={30} color="#fff"/>
        </div>
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
            <Link to='/canvas-generator'>
              <li onClick={() => handleItemClick('canvas')} className={clicked === 'canvas' ? 'clicked' : ''}>
                Canvas
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="home-nav-right">
        <div className="msg-icon" onClick={()=>{setMsgClicked(!msgClicked)}}>
          <LuMessageSquare size={30} />
          <div className="msg-count">{handleMsgCount}</div>
          <div className="msg-icon-tooltip">Messages</div>
        </div>
        <div className="user-icon" onClick={()=>setProfileClicked(!profileClicked)}>
          <AiOutlineUser size={30} />
          <div className="user-icon-tooltip">User</div>
        </div>
      </div>
      <div style={{display: msgClicked ? 'block' : 'none'}} className="messages">
            <div className="msg-top">
              <h3>Notifications</h3>
              <p onClick={handleDeleteNotification} >Dismiss All</p>
            </div>
            <hr style={{margin: '10px 0'}}/>
            <div className="msg-list">
                {notifications.length===0? "No Notification" : notifications.map((notification, index) => {
                  return <Message 
                  key={index}
                  userId={notification.userid}
                  note={notification.note}
                  id={notification._id}
                  remindMessage={notification.reminderText}
                  seen={notification.seen}
                  />
                })}
            </div>
      </div>
      <div
            className="user-profile"
            style={{ display: profileClicked === true ? "flex" : "none" }}
          >
            <div onClick={() => {setProfileClicked(!profileClicked)}} className="user-profile-cross">
              <AiOutlineClose size={24} />
            </div>
            <div className="user-profile-top">
              <p>{email}</p>
            </div>
            <div className="user-avatar-name">
              <div className="user-avatar">
                {name.split(" ")[0].charAt(0).toUpperCase()}
                <div className="avatar-edit-icon">
                  <label for="file-input" class="file-input-label">
                    <i class="fa-regular fa-pen-to-square"></i>
                  </label>
                  <input
                    type="file"
                    style={{display: 'none'}}
                    id="file-input"
                  />
                </div>
              </div>
              <div className="user-greet">
                <h1>Hi,{name.split(" ")[0]}!</h1>
              </div>
            </div>
            <div onClick={handleLogout} className="user-sign-out">
              <div className="sign-out-icon">
                <PiSignOut size={24} />
              </div>
              <p>Sign Out</p>
            </div>
          </div>
          <ul className={`menu ${menuOpen ? "menu-open": ""}`}>
      <Link to='/home'><li className="menu-tasks menu-item">
          Tasks
        </li></Link>
        <Link to='/notes'><li className="menu-notes menu-item">
          Notes
        </li></Link>
        <Link to='/canvas-generator'><li className="menu-canvas menu-item">
          Canvas
        </li></Link>
      </ul>
      <div className="mid-logo">
        <MdTaskAlt size={38} color="#fff"/>
      </div>
    </div>
  );
};

export default Navbar;
