const Exams = require('../models/exams');
const Students = require('../models/students');
const AttendanceLogs = require('../models/attendance-logs');

exports.getExams = async(req, res) => {
    try {
        let exams = await Exams.find();
        res.json({exams}).status(200);
    } catch(err) {
        console.log(err)
        res.json({done: false, error: err.message});
    }
}

exports.addExam = async(req, res) => {
    try {
        const body = req.body;
        console.log(body)
        const exam = await new Exams(body).save();
        if(exam) {
            res.status(200).json({exam});
        }
    } catch(err) {
        console.log(err)
        res.json({done: false, error: err.message});
    }
}

exports.deleteExam = async(req, res) => {
    try {
        const id = req.params.id;
        const del = await Exams.deleteOne({_id: id});
        if(del) {
            res.status(200).json({done: true});
        }
    } catch(err) {
        console.log(err)
        res.json({done: false, error: err.message});
    }
}