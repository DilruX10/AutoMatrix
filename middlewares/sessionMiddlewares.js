// import dependencies
const Session = require("../models/Session");
const StudentSession = require("../models/StudentSession");

// validate day and course for create function
const validateDataForCreate = async (req, res, next) => {
    
    // extract session data from req body
    const { dayOfTheWeek,  course } = req.body;

    // find all documents where day course are similar to req
    const valid = await Session.find({ 
            dayOfTheWeek,
            course
        }).exec();

    if (valid.length === 0) {  
        
        // if there is no similar documents
        next();

    } else {

        res.json({ // if similar document does exist
            msgType: "Error", 
            msg: "!!!..Documents with similar values exist. Please change values in order to avoid conflicts." 
        });
    }
}

// validate day and course for update function
const validateDataForUpdate = async (req, res, next) => {
    
    // get id from url
    const sessionId = req.params.id;

    // get old session data
    const sessionDetails = await Session.findById(sessionId);
    const old_dayOfTheWeek = sessionDetails.dayOfTheWeek;
    const old_course = sessionDetails.course;

    // extract session data from req body
    const { dayOfTheWeek, course } = req.body;

    // cannot update course, If students are assigned to this session
    if(old_course.toLowerCase() !== course.toLowerCase()){

        // get session code
        const sessionCode = sessionDetails.code;
            
        // check whether any students are assigned to this session
        const studentsAssigned = await StudentSession.find({ 
            sessionCode: sessionCode
        });

        if (studentsAssigned.length !== 0) {  // if students are assigned
                
            res.json({ 
                msgType: "Error",
                msg: "!!!..Students are assigned to this session. Cannot change course property." 
            });
        }   

        // check whether day has changed
    } else if(old_dayOfTheWeek.toLowerCase() === dayOfTheWeek.toLowerCase()){ 

        next(); // if all are the same

    } else {

        // find all documents where course and day are similar to req
        const valid = await Session.find({ 
            dayOfTheWeek,
            course
        }).exec();

        if (valid.length === 0) {

            next(); // if there is no duplicate documents
    
        } else {
    
            res.json({ // if similar document does exist 
                msgType: "Error",
                msg: "!!!..Similar document exist. Please change values for day and course." 
            });
        }
    }
}

// if any students are assigned to session that it cannot be deleted.
const validateDataForDelete = async (req, res, next) => {
    
    // get id from url
    const sessionId = req.params.id;

    // get session code
    const sessionDetails = await Session.findById(sessionId);
    const sessionCode = sessionDetails.code;

    // check whether any students are assigned to this session
    const valid = await StudentSession.find({ 
        sessionCode: sessionCode
    });

    if (valid.length === 0) { 
        
        next(); // if no students are assigned

    } else { // if students are assigned to this course

        res.json({ 
            msgType: "Error",
            msg: "!!!..Session cannot be deleted. Students are assigned to this session." 
        });
    }  
}

const viewTimetable = async (req, res, next) => {

    const userCode = req.query.code;

    if(userCode.substring(0,2) === "IN" || userCode.substring(0,2) === "ST"){
        
        next();

    } else {

        // response
        res.json({
            msgType: "Error",
            msg: "!!!..Invalid ID.",
        });
    }
}

// export functions
module.exports = {
    validateDataForCreate,
    validateDataForUpdate,
    validateDataForDelete,
    viewTimetable
};
