// import dependencies
const express=require('express');
const router=express.Router();
const courseController = require("../controllers/courseController");
const courseMiddleware = require("../middlewares/courseMiddlewares");

// course routes

// create a new course
router.post('/new', courseMiddleware.validateTitleForCreate, courseController.createCourse);

// get all courses
router.get('/view', courseController.getAllCourses);

// get courses data for charts
router.get('/forChart', courseController.getCourseData);

// get one course
router.get('/view/:id', courseController.getOneCourse);

// update course details
router.post('/update/:id', courseMiddleware.validateTitleForUpdate, courseController.updateCourse);

// delete course
router.delete('/delete/:id', courseMiddleware.validateCourseForDelete, courseController.deleteCourse);

module.exports=router;