import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'
const NavBar = () => {
  return (
    <nav className='navbar'>
      <div className='system-name' style={{"margin-left": "50px"}}>Auto Matrix</div>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/lessons'>Courses</Link>
        </li>
        <li>
          <Link to='/instructors'>Instructors</Link>
        </li>
        <li>
          <Link to='/exam'>Exam</Link>
        </li>
        <li>
          <Link to='/staff'>Staff</Link>
        </li>
        <li>
          <Link to='/adminhome'>Admin</Link>
        </li>
      </ul>
      <ul>
        <li className='right'>
          <button className='login-btn'>Login</button>
        </li>
        <li className='right'>
          <button className='login-btn-join'>JOIN US </button>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
