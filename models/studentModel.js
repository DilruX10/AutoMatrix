const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  studentID: { type: Number, required: true, unique: true },
  courseCode: {
    type: String,
    default: 'C001',
  },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
})

const studentModel = mongoose.model('student', studentSchema)

module.exports = studentModel
