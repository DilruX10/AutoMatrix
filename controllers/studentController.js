const StudentData = require('../models/studentModel')

// Get all students
const getStudents = async (req, res) => {
  // res.send(`<h1>hey this is student page</h1>`);
  try {
    const allStudents = await StudentData.find()
    res.status(200).json(allStudents)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

// Get all students
const findPerson = async (req, res) => {
  const { email } = req.params
  console.log(req.params);
  // res.send(`<h1>hey this is student page</h1>`);
  try {
    const allStudents = await StudentData.find({ email })
    res.status(200).json(allStudents)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

// Create a new student
const createStudent = async (req, res) => {
  const student = req.body
  const newStudent = new StudentData(student)
  try {
    await newStudent.save()
    res.status(201).json(newStudent)
  } catch (err) {
    res.status(409).json({ message: err.message })
  }
}

//update student
const updateStudent = async (req, res) => {
  const { id } = req.params
  const student = req.body

  try {
    const updatedStudent = await StudentData.findByIdAndUpdate(id, student, {
      new: true,
    })
    res.status(200).json(updatedStudent)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}
//get student by id
const getStudentById = async (req, res) => {
  const { id } = req.params

  try {
    const student = await StudentData.findById(id)
    res.status(200).json(student)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

const deleteStudent = async (req, res) => {
  const id = req.params.id

  try {
    await StudentData.findByIdAndRemove(id).exec()
    res.send('Succesfully deleted')
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getStudents,
  createStudent,
  deleteStudent,
  getStudentById,
  updateStudent,
  findPerson,
}
