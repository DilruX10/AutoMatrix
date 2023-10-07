const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    code: {
        type: String,  
        required: true,
        unique: true
    },
    start_time: {
        type: String,  
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    dayOfTheWeek: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Available"
    },
    max_Students: {
        type: Number,
        default: 0
    }
});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;