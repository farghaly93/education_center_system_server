const express = require('express');
const router = express.Router();
const examsControl = require('../controls/exams-controller');


router.get('/getExams', examsControl.getExams);
router.post('/addExam', examsControl.addExam);
router.get('/deleteExam/:id', examsControl.deleteExam);

module.exports = router;
