import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import React, { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

export default function AddStudent() {
  const classes = useStyles()
  const [student, setStudent] = useState({
    studentID: 0,
    courseCode: 'C001',
    name: '',
    age: '',
    email: '',
    address: '',
    phone: '',
    password: '',
  })
  const createStudent = () => {
    axios.post('http://localhost:80/students', student).then(() => {
      window.location.reload(false)
    })
  }
  return (
    <>
      <h1>Add your data</h1>
      <form className={classes.root} noValidate autoComplete='off'>
        <TextField
          id='standard-basic'
          label='Student ID'
          value={student.studentID}
          onChange={(event) => {
            setStudent({ ...student, studentID: event.target.value })
          }}
        />
        <TextField
          id='standard-basic'
          label='Course Code'
          value={student.courseCode}
          onChange={(event) => {
            setStudent({ ...student, courseCode: event.target.value })
          }}
        />
        <TextField
          id='standard-basic'
          label='Name'
          value={student.name}
          onChange={(event) => {
            setStudent({ ...student, name: event.target.value })
          }}
        />
        <TextField
          id='standard-basic'
          label='Age'
          value={student.age}
          onChange={(event) => {
            setStudent({ ...student, age: event.target.value })
          }}
        />
        <TextField
          id='standard-basic'
          label='Email'
          value={student.email}
          onChange={(event) => {
            setStudent({ ...student, email: event.target.value })
          }}
        />
        <TextField
          id='standard-basic'
          label='Address'
          value={student.address}
          onChange={(event) => {
            setStudent({ ...student, address: event.target.value })
          }}
        />
        <TextField
          id='standard-basic'
          label='phone'
          value={student.phone}
          onChange={(event) => {
            setStudent({ ...student, phone: event.target.value })
          }}
        />
        <TextField
          id='standard-basic'
          label='password'
          value={student.password}
          onChange={(event) => {
            setStudent({ ...student, password: event.target.value })
          }}
        />
        <Button variant='contained' color='primary' onClick={createStudent}>
          Submit
        </Button>
      </form>
    </>
  )
}
