const express=require('express');
const router=express.Router();
const sessionController = require("../controllers/sessionController");
const sessionMiddleware = require("../middlewares/sessionMiddlewares");

// session routes

// create a new session
router.post('/new', sessionMiddleware.validateDataForCreate, sessionController.createSession);

// get all sessions
router.get('/view', sessionController.getAllSessions);

// get sessions data for charts
router.get('/forChart', sessionController.getSessionData);

// get one session
router.get('/view/:id', sessionController.getOneSession);

// get sessions for a student
// router.get('/viewForStudent', sessionController.viewStudentSessions);

// get sessions for an instructor
router.get('/viewTimetable', sessionMiddleware.viewTimetable, sessionController.viewTimetable);

// update session details
router.post('/update/:id', sessionMiddleware.validateDataForUpdate, sessionController.updateSession);

// delete session
router.delete('/delete/:id', sessionMiddleware.validateDataForDelete, sessionController.deleteSession);

module.exports=router;