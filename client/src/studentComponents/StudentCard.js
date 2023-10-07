import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import './StudentCard.css'

const StudentProfileCard = () => {
  const location = useLocation()
  const [student, setStudent] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:80/students/find/${location.state.email}`
        )
        console.log(res)
        setStudent(res.data[0])
        setName(res.data[0].name)
        setEmail(res.data[0].email)
        setPhone(res.data[0].phone)
        setAddress(res.data[0].address)
      } catch (error) {
        console.error(error)
        setError('Could not fetch student details')
      }
    }
    fetchData()
  }, [location.state.email])

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setPhone(event.target.value)
  }

  const handleAddressChange = (event) => {
    setAddress(event.target.value)
  }

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:80/students/update/${email}`,
        {
          name: name,
          phone: phone,
          address: address,
        }
      )
      console.log(res)
      setError('')
      alert('Profile updated successfully')
    } catch (error) {
      console.error(error)
      setError('Could not update profile')
    }
  }

  return (
    <div className='card'>
      <h1>Student Profile</h1>
      {student ? (
        <div>
          <div>
            <label>Name:</label>
            <input type='text' value={name} onChange={handleNameChange} />
          </div>
          <div>
            <label>Email:</label>
            <input
              type='email'
              value={email}
              onChange={handleEmailChange}
              disabled
            />
          </div>
          <div>
            <label>Phone:</label>
            <input type='text' value={phone} onChange={handlePhoneChange} />
          </div>
          <div>
            <label>Address:</label>
            <input type='text' value={address} onChange={handleAddressChange} />
          </div>
          <div>
            <button onClick={handleUpdate}>Update</button>
          </div>
          {error && <div className='error-message'>{error}</div>}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default StudentProfileCard
