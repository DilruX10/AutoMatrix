const mongoose = require('mongoose');

const studentSessionSchema = new mongoose.Schema({
    studentCode: {
        type: String,  
        required: true,
    },
    sessionCode: {
        type: String,
        required: true
    }
});

const StudentSession = mongoose.model('StudentSession', studentSessionSchema);
module.exports = StudentSession;