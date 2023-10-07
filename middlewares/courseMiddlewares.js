// import dependencies
const Course = require("../models/Course");
const Session = require("../models/Session");

// validate course title for create
const validateTitleForCreate = async (req, res, next) => {

    // extract course data from req body
    const { title } = req.body;

    // find all documents where title similar to req
    const valid = await Course.find({ 
        title: RegExp(title, 'i')
    });

    if (valid.length === 0) {  // if there is no such documents

        next();

    } else {

        res.json({ // if similar document does exist 
            msgType: "Error",
            msg: "!!!..Record with similar title exist. Please change the title." 
        });
    }
};

// validate course title for update
const validateTitleForUpdate = async (req, res, next) => {

    // get id from url
    const courseId = req.params.id;

    // get old course title
    const courseDetails = await Course.findById(courseId);
    const oldTitle = courseDetails.title;

    // extract course data from req body
    const { title } = req.body;
    
    // check whether title is changed
    if(oldTitle.toLowerCase() === title.toLowerCase()){ 

        next(); // if title is the same

    } else {

        // find all documents where title similar to req
        const valid = await Course.find({ 
            title: RegExp(title, 'i')
        });

        if (valid.length === 0) { 

            next(); // if there is no such documents
    
        } else {
    
            res.json({ // if similar document does exist 
                msgType: "Error",
                msg: "!!!..Record with similar title exist. Please change the title." 
            });
        }
    }
};

// if any students are assigned to this course that it cannot be deleted.
const validateCourseForDelete = async (req, res, next) => {

    // get id from url
    const courseId = req.params.id;

    // get num Of Students Enrolled
    const courseDetails = await Course.findById(courseId);
    const num_Of_Students_Enrolled = courseDetails.num_Of_Students_Enrolled;

    // check whether any students are assigned to this course
    if (num_Of_Students_Enrolled === 0) {  
        
        // if there are no students
        // get course code 
        const courseCode = courseDetails.code;

        // delete related records in session collection
        await Session.deleteMany({course: courseCode});

        next();

    } else { // if students are assigned to this course

        res.json({ 
            msgType: "Error",
            msg: "!!!..Course cannot be deleted. Students are assigned to this course." 
        });
    }    
};

// export functions
module.exports = {
    validateTitleForCreate,
    validateTitleForUpdate,
    validateCourseForDelete
};
