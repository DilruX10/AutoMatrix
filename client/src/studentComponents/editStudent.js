import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const EditStudent = () => {
  const { id } = useParams()
  // const history = useHistory()
  const navigate = useNavigate()

  const [studentID, setId] = useState('')
  const [courseCode, setCourse] = useState('')
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://localhost:80/students/${id}`)
        setId(res.data.studentID)
        setCourse(res.data.courseCode)
        setName(res.data.name)
        setAge(res.data.age)
        setEmail(res.data.email)
        setAddress(res.data.address)
        setPhone(res.data.phone)
        setPassword(res.data.password)
      } catch (error) {
        console.error(error)
      }
    }

    fetchStudent()
  }, [id])

  const handleFormSubmit = async () => {
    //e.preventDefault()
    try {
      const res = await axios.put(`http://localhost:80/students/${id}`, {
        studentID,
        courseCode,
        name,
        age,
        email,
        address,
        phone,
        password,
      })
      console.log(res.data)
      console.log('Successfully inserted')
      navigate('../studentDetails', { replace: true })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <center>
        <h1>Edit Student</h1>
        <form onSubmit={handleFormSubmit}>
          <div>
            <TextField
              label='Course Code'
              value={courseCode}
              onChange={(event) => setCourse(event.target.value)}
              margin='normal'
            />
          </div>
          <div>
            <TextField
              label='Name'
              value={name}
              onChange={(event) => setName(event.target.value)}
              margin='normal'
            />
          </div>
          <div>
            <TextField
              label='Age'
              value={age}
              onChange={(event) => setAge(event.target.value)}
              margin='normal'
            />
          </div>
          <div>
            <TextField
              label='Email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              margin='normal'
            />
          </div>
          <div>
            <TextField
              label='Address'
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              margin='normal'
            />
          </div>
          <div>
            <TextField
              label='Phone'
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              margin='normal'
            />
          </div>
          <div>
            <TextField
              label='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              margin='normal'
            />
          </div>
          <Button
            type='button'
            variant='contained'
            color='primary'
            onClick={handleFormSubmit}
          >
            Save Changes
          </Button>
        </form>
      </center>
    </>
  )
}

export default EditStudent
