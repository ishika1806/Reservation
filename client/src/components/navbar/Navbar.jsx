import React, { useContext } from 'react'
import './Navbar.css'
import {Link }from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
const Navbar = () => {
  const {user}=useContext(AuthContext)
  return (
    <div className='navbar'>
        <div className="navbar-container">
         <Link to="/"> <div className="navbar-brand">LogOut</div></Link>
           
            {!user&&<div>
                <button className="navButton">Register</button>
                <button className="navButton">Login</button>
            </div>}
            {user&&<div>{user.username}</div>}

        </div>
    </div>
  )
}

export default Navbar