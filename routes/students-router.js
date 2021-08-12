const express = require('express');
const router = express.Router();
const studentsControl = require('../controls/students-controller');


router.post('/addStudent', studentsControl.addStudent);
router.post('/editStudent/:id', studentsControl.editStudent);
router.get('/deleteStudent/:id', studentsControl.deleteStudent);
router.get('/fetchStudents', studentsControl.fetchStudents); 
router.get('/getStudentData/:id', studentsControl.getStudentData);
router.post('/attendStudent', studentsControl.attendStudent);
router.get('/getStudentAttendanceLog/:id', studentsControl.getStudentAttendanceLog);

module.exports = router;
