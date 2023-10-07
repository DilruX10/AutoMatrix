import React from 'react'
import { Link } from 'react-router-dom'

function AdminHome() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>
        Admin Home Page
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <Link
          style={{
            backgroundColor: '#eee',
            color: '#333',
            textDecoration: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            boxShadow: '1px 1px 5px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease',
          }}
          to='/studentDetails'
        >
          Student Management
        </Link>
        <Link
          style={{
            backgroundColor: '#eee',
            color: '#333',
            textDecoration: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            boxShadow: '1px 1px 5px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease',
          }}
          to='/adminLMHome'
        >
          Lesson Management 
        </Link>
        <Link
          style={{
            backgroundColor: '#eee',
            color: '#333',
            textDecoration: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            boxShadow: '1px 1px 5px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease',
          }}
          to='/adminViewCourses'
        >
          Instructor Management 
        </Link>
        <Link
          style={{
            backgroundColor: '#eee',
            color: '#333',
            textDecoration: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            boxShadow: '1px 1px 5px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease',
          }}
          to='/'
        >
          Staff Management 
        </Link>
      </div>
    </div>
  )
}

export default AdminHome
