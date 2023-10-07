const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    code: {
        type: String,  
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
		required: true
    },
    num_Of_Students_Enrolled: {
        type: Number,
        default: 0
    },
	processingFee: {
        type: Number,
        required: true
    },
	sessionFee: { 
        type: Number,
        required: true
    },
    vehicleTypes: {
        type: [String]
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;