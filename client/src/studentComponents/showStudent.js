import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import DeleteIcon from '@material-ui/icons/Delete'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EditIcon from '@material-ui/icons/Edit'
import { useNavigate } from 'react-router-dom'
import { CSVLink } from 'react-csv'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    width: 400,
    marginBottom: 10,
  },
  input: {
    marginLeft: 10,
    flex: 1,
  },
  searchButton: {
    padding: 10,
  },
})

export default function ShowStudent() {
  const classes = useStyles()
  const [studentList, showStudentList] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const deleteStudent = (id) => {
    axios.delete(`http://localhost:80/students/${id}`).then(() => {
      window.location.reload(false)
    })
  }

  useEffect(() => {
    axios.get('http://localhost:80/students').then((allStudents) => {
      showStudentList(allStudents.data)
    })
  }, [])

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
  }

  const filteredStudentList = studentList.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const headers = [
    { label: 'Student ID', key: 'studentID' },
    { label: 'Course Code', key: 'courseCode' },
    { label: 'Name', key: 'name' },
    { label: 'Age', key: 'age' },
    { label: 'Email', key: 'email' },
    { label: 'Address', key: 'address' },
    { label: 'Phone', key: 'phone' },
  ]

  return (
    <>
      <h1>All Students</h1>
      <Paper className={classes.searchBar}>
        <InputBase
          className={classes.input}
          placeholder='Search by name'
          inputProps={{ 'aria-label': 'search by name' }}
          value={searchQuery}
          onChange={handleSearch}
        />
      </Paper>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <CSVLink
          data={studentList}
          headers={headers}
          filename='students.csv'
          className={classes.button}
        >
          Download as excel file
        </CSVLink>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center' fontWeight='bold'>
                Student ID
              </TableCell>
              <TableCell align='center' fontWeight='bold'>
                Course Code
              </TableCell>
              <TableCell align='center' fontWeight='bold'>
                Name
              </TableCell>
              <TableCell align='center' fontWeight='bold'>
                Age
              </TableCell>
              <TableCell align='center' fontWeight='bold'>
                Email
              </TableCell>
              <TableCell align='center' fontWeight='bold'>
                Address
              </TableCell>
              <TableCell align='center' fontWeight='bold'>
                Phone
              </TableCell>
              <TableCell align='center' fontWeight='bold'>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudentList.map((student, key) => (
              <TableRow key={student.key}>
                <TableCell align='center' component='th' scope='row'>
                  {student.studentID}
                </TableCell>
                <TableCell align='center'>{student.courseCode}</TableCell>
                <TableCell align='center'>{student.name}</TableCell>
                <TableCell align='center'>{student.age}</TableCell>
                <TableCell align='center'>{student.email}</TableCell>
                <TableCell align='center'>{student.address}</TableCell>
                <TableCell align='center'>{student.phone}</TableCell>
                <TableCell align='center'>
                  <IconButton aria-label='edit' className={classes.margin}>
                    <EditIcon
                      fontSize='small'
                      onClick={() => navigate(`/editStudent/${student._id}`)}
                    />
                  </IconButton>
                  <IconButton aria-label='delete' className={classes.margin}>
                    <DeleteIcon
                      fontSize='small'
                      onClick={() => deleteStudent(student._id)}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
