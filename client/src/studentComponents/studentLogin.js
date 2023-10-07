import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import axios from 'axios'

const StudentLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async () => {
    var res
    var person
    try {
      res = await axios.get(`http://localhost:80/students/find/${email}`)
      console.log(res)
      person = res.data[0]
    } catch (error) {
      console.error(error)
    }
    // Check if the email and password match an account in the database
    var account = false
    account =
      person.email === email && person.password === password ? true : false

    if (account) {
      navigate('/studentCard', {
        state: { message: 'Successfully logged in!' },
      })
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className='login-container'>
      <h1>Student Login</h1>
      <div>
        <label>Email:</label>
        <input type='email' value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <label>Password:</label>
        <input
          type='password'
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
      {error && <div className='error-message'>{error}</div>}
    </div>
  )
}

export default StudentLogin
