const express = require('express')
const {
  getStudents,
  createStudent,
  deleteStudent,
  getStudentById,
  updateStudent,
  findPerson,
} = require('../controllers/studentController')

const router = express.Router()

router.get('/', getStudents)
router.post('/', createStudent)
router.get('/:id', getStudentById)
router.put('/:id', updateStudent)
router.delete('/:id', deleteStudent)
router.get('/find/:email', findPerson )

module.exports = router
