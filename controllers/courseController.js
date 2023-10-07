// import dependencies
const Course = require("../models/Course");
const createID = require("../utils/createID");

// create document function for course
const createCourse = async (req, res) => {

    // extract course data from req body
    const { title, description, processingFee, sessionFee, vehicleTypes } = req.body;

    // assign a random string as code for course
    const code = createID.createCourseID();

    // create an document
    const course = await Course.create({
        code,
        title,
        description,
        processingFee,
        sessionFee,
        vehicleTypes: vehicleTypes.split(";")
    });

    // check whether new document exists in the collection
    if (course.length === 0) {

        res.json({ msg: "!!!..Record Not Created." }); // if not, send err msg

    } else {

        res.json({ // if yes, respond with new document
            course,
            msgType: "Success",
            msg: "Record Created Successfully..!!!" 
        });
    }  
};

// get all documents in course collection
const getAllCourses = async (req, res) => {

    // find all documents
    const courses = await Course.find();

    // check whether documents exists
    if (courses.length === 0) {

        res.json({ msg: "!!!..Records Not Found." }); // if not, send err msg
    
    } else {

        res.json({ // if yes, respond with documents
            courses,
        });
    }
};

// get one document in course collection by id param
const getOneCourse = async (req, res) => {

    // get id from url
    const courseId = req.params.id;
    
    // find the document with that id
    const course = await Course.findById(courseId);

    // check whether document exists
    if (course.length === 0) {

        res.json({ msg: "!!!..Record Not Found." }); // if not, send err msg
    
    } else {

        res.json({ // if yes, respond with document
            course
        });
    }
};

// send data for course chart
const getCourseData = async (req, res) => {

    // find all documents
    const courseData = await Course.find().select({
        code: 1, 
        num_Of_Students_Enrolled: 1, 
        _id: 0
    }).sort({
        num_Of_Students_Enrolled: -1
    });

    // create course array and push course object with necessary data for charts
    var courses = [];

    for await (const c of courseData){

        // create a object with required data
        var cObj = {
            name: c.code,
            value: c.num_Of_Students_Enrolled     
        }

        // add object to courses array
        courses.push(cObj);
    }

    // check whether documents exists
    if (courses.length === 0) {

        res.json({ msg: "!!!..Records Not Found." }); // if not, send err msg
    
    } else {

        res.json({ // if yes, respond with documents
            courses,
        });
    }
};

// update document function for session
const updateCourse = async (req, res) => {

    // get id from url
    const courseId = req.params.id;
    
    // extract course data from req body
    const {title, description, processingFee, sessionFee, num_Of_Students_Enrolled, vehicleTypes} = req.body;

    // update the document
    await Course.findByIdAndUpdate(courseId, {
        title,
        description,
        processingFee,
        sessionFee,
        num_Of_Students_Enrolled,
        vehicleTypes: vehicleTypes.split(";")
    });

    // get the updated document
    const course = await Course.findById(courseId);

    // check whether updated document exists in the collection
    if (course.length === 0) {

        res.json({ msg: "!!!..Record Not Found." }); // if not, send err msg

    } else {

        res.json({ // if yes, respond with new document
            course,
            msgType: "Success",
            msg: "Record Updated Successfully..!!!" 
        });
    }
};

// delete document function for session
const deleteCourse = async (req, res) => {

    // get id from url
    const courseId = req.params.id;

    // get course code from req body
    // const { courseCode } = req.body;
        
    // find course and delete it
    const course = await Course.findByIdAndDelete(courseId);
    
    // delete related records in session collection
    /* if (courseCode !== null){
        await Session.deleteMany({course: courseCode});
    } */

    // check whether document is deleted
    if (course.length === 0) {

        res.json({ msg: "!!!..Record Not Found." }); 
    
    } else {
    
        res.json({ // if yes, it is deleted
            msgType: "Success",
            msg: "Record Deleted Successfully..!!!" 
        });
    }    
};

// export functions
module.exports = { 
    createCourse, 
    getAllCourses,
    getCourseData,
    getOneCourse,
    updateCourse,
    deleteCourse
}
