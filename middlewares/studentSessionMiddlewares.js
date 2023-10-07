// import dependencies
const StudentSession = require("../models/StudentSession");
const Session = require("../models/Session");

// find whether session has reached its max capacity
let checkMaxStudents = async function(sessionCode){
    
    // get number of students in the session
    const countStudents = await StudentSession.countDocuments({ 'sessionCode': sessionCode });

    // get max amount of students in the session
    const sessionDetails = await Session.findOne({
        code: sessionCode
    })
    const maxStudents = sessionDetails.max_Students;

    // check whether max student amount is reached
    return (countStudents >= maxStudents);
}

// find all documents in studentSession collection where both studentCode and sessionCode are similar to the ones in req
let findSimilar = async function (studentCode, sessionCode){
    
    const valid = await StudentSession.find({ 
        studentCode: studentCode,
        sessionCode: sessionCode
    });

    return (valid.length === 0);
}

let checkMaxSessionsForStudent = async function(studentCode){
    
    // get number of sessions for a student
    const countSessions = await StudentSession.countDocuments({ 'studentCode': studentCode });

    // check whether max student amount is reached
    return (countSessions >= 4);
}

// check for student counts and duplicate records 
const validateDataForCreate = async (req, res, next) => {

    // extract studentSession data from req body
    const { studentCode, sessionCode } = req.body;

    if (await checkMaxSessionsForStudent(studentCode)){
        
        // if student have more then 4 sessions per week

         // response
        res.json({
            msgType: "Error",
            msg: "!!!..Students can't be assigned to more than 4 session per week.",
        });

    } else if(await checkMaxStudents(sessionCode)){
        
        // if session is full

        // update session status
        await Session.updateOne({ code: sessionCode }, { status: 'Full' });

        // response
        res.json({
            msgType: "Error",
            msg: "!!!..Session is at maximum capacity.",
        });

    } else if (await findSimilar(studentCode, sessionCode)) { 

        // if there is no such documents in studentSession collection 
        next();
            
    } else {

        // if duplicate documents exist
        res.json({ 
            msg: "!!!..Similar Document Exist." 
        });
    }   
}   

const validateDataForUpdate = async (req, res, next) => {
    
    // get id from url
    const studentSessionId = req.params.id;
    
    // extract studentSession data from req body
    const { studentCode, sessionCode } = req.body;

    // get old studentSession data
    const studentSessionDetails = await StudentSession.findById(studentSessionId);
    const old_sessionCode = studentSessionDetails.sessionCode;

    // check whether sessionCode is changed
    if(old_sessionCode.toLowerCase() === sessionCode.toLowerCase()){
        
        // if sessionCode is the same

        // response
        res.json({
            studentSessionDetails,
            msg: 'No Changes'
        });

    } else if(await checkMaxStudents(sessionCode)){
        
        // if session is full

        // update session status
        await Session.updateOne({ code: sessionCode }, { status: 'Full' });

        // response
        res.json({
            msgType: "Error",
            msg: "!!!..Session is at maximum capacity.",
        });

    } else if (await findSimilar(studentCode, sessionCode)) { 

        // if there is no similar documents
        next();
            
    } else { 

        // if duplicate documents exist
        res.json({ 
            msg: "!!!..Similar Document Exist." 
        });
    } 
}

// export functions
module.exports = {
    validateDataForCreate,
    validateDataForUpdate
};