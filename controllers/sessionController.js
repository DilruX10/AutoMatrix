// import dependencies
const Session = require("../models/Session");
const StudentSession = require("../models/StudentSession");
const Course = require("../models/Course");
const createID = require("../utils/createID");

// create document function for session
const createSession = async (req, res) => {

    // extract session data from req body
    const { start_time, end_time, dayOfTheWeek, instructor, status, max_Students, course } = req.body;

    // assign a random string as code for session
    const code = createID.createSessionID();
    
    // validate start, end time with day

    // find all documents where start_time, end_time and day are similar to req
    const valid = await Session.find({ 
            start_time, 
            end_time,
            dayOfTheWeek,
            course
        }).exec();

    if (valid.length === 0) {  // if there is no such documents
        
        // create an document
        const session = await Session.create({
            code,
            start_time,
            end_time,
            dayOfTheWeek,
            instructor,
            max_Students,
            course
        })

        // check whether new document exists in the collection
        if (session.length === 0) {

            res.json({ msg: "!!!..Record Not Created." }); // if not, send err msg

        } else {

            res.json({ // if yes, respond with new document
                session,
                msgType: "Success",
                msg: "Record Created Successfully..!!!" 
            });
        }
    } else {

        res.json({ // if similar document does exist 
            msg: "!!!..Similar Record Exist." 
        });
    }
}

// get all documents in session collection
const getAllSessions = async (req, res) => {

    // find all documents
    const sessions = await Session.find();

    // check whether documents exists in the collection
    if (sessions.length === 0) {

        res.json({ msg: "!!!..Records Not Found." }); // if not, send err msg
    
    } else {

        res.json({ // if yes, respond with documents
            sessions,
        });
    }
}

// send data for session chart
const getSessionData = async (req, res) => {

    // find all documents
    const sessionData = await Session.find().select({
        code: 1, 
        max_Students: 1, 
        _id: 0
    });

    // create session array and push session object with necessary data for charts
    var sessions = [];

    //since I have an async task inside use 'for await' to wait until loop is completed.
    for await (const s of sessionData){
        
        // get number of students in the session
        var countStudents = await StudentSession.countDocuments({ 'sessionCode': s.code });

        // create a object with required data
        var sObj = {
            name: s.code,
            reserved: countStudents,
            empty: (s.max_Students - countStudents)            
        }

        // add object to sessions array
        sessions.push(sObj);
    };

    // check whether documents exists
    if (sessions.length === 0) {

        res.json({
            msgType: "Error" ,
            msg: "!!!..Records Not Found."
        }); // if not, send err msg
    
    } else {

        res.json({ // if yes, respond with documents
            sessions,
        });
    }
};

// get timetable for a student
const viewStudentTimetable = async (userCode) => {

    // find sessionCodes for the student
    const sessionCodes = await StudentSession.find({
        studentCode: userCode
    }).select({
        sessionCode: 1,
        _id: 0
    });
    
    // format sessionCodes for the student as an array 
    const sessionCodesArray = [];
    
    Object.keys(sessionCodes).map(async (key) => {
        const code = sessionCodes[key].sessionCode;
        sessionCodesArray.push(code.toString());
    });

    // get session data for sessions
    const sessions = await Session.find({
        code: {$in: sessionCodesArray}
    }).sort({
        start_time: 1
    })

    return sessions;
}

// get timetable for an instructor
const viewInstructorTimetable = async (userCode) => {

    // find sessions for the instructor
    const sessions = await Session.find({
        instructor: userCode
    }).sort({
        start_time: 1
    })

    return sessions;
}

// get timetable
const viewTimetable = async (req, res) => {

    const userCode = req.query.code;
    var sessions = null;
    
    if(userCode.substring(0,2) === "IN"){

        sessions = await viewInstructorTimetable(userCode);

    } else if(userCode.substring(0,2) === "ST"){

        sessions = await viewStudentTimetable(userCode);

    }

    // check whether documents exists in the collection
    if (sessions.length === 0) {

        res.json({ msg: "!!!..Records Not Found." }); // if not, send err msg
    
    } else {

        res.json({ // if yes, respond with documents
            sessions,
        });
    }
}

// get one document in session collection by id param
const getOneSession = async (req, res) => {

    // get id from url
    const sessionId = req.params.id;
    
    // find the document with that id
    const session = await Session.findById(sessionId);

    // check whether document exists
    if (session.length === 0) {

        res.json({ msg: "!!!..Record Not Found." }); // if not, send err msg
        
    } else {

        res.json({ // if yes, respond with document
            session
        });
    }
}

// update document function for session
const updateSession = async (req, res) => {

    // get id from url
    const sessionId = req.params.id;
    
    // extract session data from req body
    const { start_time, end_time, dayOfTheWeek, instructor, status, max_Students, course } = req.body;

    // update the document
    await Session.findByIdAndUpdate(sessionId, {
        start_time,
        end_time,
        dayOfTheWeek,
        instructor,
        status,
        max_Students,
        course
    });

    // get the updated document
    const session = await Session.findById(sessionId);

    // check whether new document exists in the collection
    if (session.length === 0) {

        res.json({ msg: "!!!..Record Not Found." }); // if not, send err msg

    } else {
        res.json({ // if yes, respond with new document
            session,
            msgType: "Success",
            msg: "Record Updated Successfully..!!!"
        });
    }
}

// delete document function for session
const deleteSession = async (req, res) => {

    // get id from url
    const sessionId = req.params.id;
    
    // find and delete document
    const session = await Session.findByIdAndDelete(sessionId);

    // check whether document is deleted
    if (session.length === 0) {

        res.json({ msg: "!!!..Record Not Found." }); 
        
    } else {
    
        res.json({ // if yes, it is deleted
            msgType: "Success",
            msg: "Record Deleted Successfully..!!!" 
        });
    } 
}

// export functions
module.exports = { 
    createSession, 
    getAllSessions,
    viewTimetable,
    getSessionData,
    getOneSession,
    updateSession,
    deleteSession
}