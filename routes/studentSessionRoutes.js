const express=require('express');
const router=express.Router();
const studentSessionController = require("../controllers/StudentSessionController");
const studentSessionMiddleware = require("../middlewares/StudentSessionMiddlewares");

// session routes

// create a new session
router.post('/new', studentSessionMiddleware.validateDataForCreate, studentSessionController.createStudentSession);

// get all sessions
router.get('/view', studentSessionController.getAllStudentSessions);

// get one session
router.get('/view/:id', studentSessionController.getOneStudentSession);

// update session details
router.post('/update/:id', studentSessionMiddleware.validateDataForUpdate, studentSessionController.updateStudentSession);

// delete session
router.delete('/delete/:id', studentSessionController.deleteStudentSession);

module.exports=router;