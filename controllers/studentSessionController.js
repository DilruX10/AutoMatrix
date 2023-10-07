// import dependencies
const StudentSession = require("../models/StudentSession");
const Session = require("../models/Session");

// create document function for studentSession
const createStudentSession = async (req, res) => {

    // extract studentSession data from req body
    const { studentCode, sessionCode } = req.body;

            // create an document
            const studentSession = await StudentSession.create({
                studentCode,
                sessionCode
            });

            // check whether new document exists in the in studentSession collection 
            if (studentSession.length === 0) {

                res.json({ msg: "!!!..Record Not Created." }); // if not, send err msg

            } else {

                res.json({ // if yes, respond with the new document
                    studentSession,
                    msgType: "Success",
                    msg: "Record Created Successfully..!!!" 
                });
            }
};

// get all documents in studentSession collection
const getAllStudentSessions = async (req, res) => {

    // find all documents
    const studentSessions = await StudentSession.find().sort({
        studentCode: 1
    });

    // check whether documents exists
    if (studentSessions.length === 0) {

        res.json({ msg: "!!!..Records Not Found." }); // if not, send err msg
    
    } else {

        res.json({ // if yes, respond with documents
            studentSessions,
        });
    }
};

// get one document in studentSession collection by id param
const getOneStudentSession = async (req, res) => {

    // get id from url
    const studentSessionId = req.params.id;
    
    // find the document with that id
    const studentSession = await StudentSession.findById(studentSessionId);

    // check whether document exists
    if (studentSession.length === 0) {

        res.json({ msg: "!!!..Record Not Found." }); // if not, send err msg
    
    } else {

        res.json({ // if yes, respond with document
            studentSession
        });
    }
};

// update document function for session
const updateStudentSession = async (req, res) => {

    // get id from url
    const studentSessionId = req.params.id;
    
    // extract studentSession data from req body
    const { studentCode, sessionCode } = req.body;
            
            // update the document
            await StudentSession.findByIdAndUpdate(studentSessionId, {
                studentCode,
                sessionCode
            });

            // get the updated document from in studentSession collection 
            const studentSession = await StudentSession.findById(studentSessionId);

            // check whether new document exists in the in studentSession collection 
            if (studentSession.length === 0) {

                res.json({ msg: "!!!..Record Not Found." }); // if not, send err msg

            } else {

                res.json({ // if yes, respond with the updated document
                    studentSession,
                    msgType: "Success",
                    msg: "Record Updated Successfully..!!!" 
                });
            }  
};

// delete document function for session
const deleteStudentSession = async (req, res) => {

    // get id from url
    const studentSessionId = req.params.id;
    
    // find studentSession and delete it
    const studentSession = await StudentSession.findByIdAndDelete(studentSessionId);
    
    // check whether deleted document exists in the collection
    if (studentSession.length === 0) {

        res.json({ msg: "!!!..Record Not Found." }); // if not, send err msg
    
    } else {
    
        res.json({ // if yes, it is deleted
            msgType: "Success",
            msg: "Record Deleted Successfully..!!!" 
        });
    }
};

// export functions
module.exports = { 
    createStudentSession, 
    getAllStudentSessions,
    getOneStudentSession,
    updateStudentSession,
    deleteStudentSession
}
