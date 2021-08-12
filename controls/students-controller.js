const Groups = require('../models/groups');
const Students = require('../models/students');
const AttendanceLogs = require('../models/attendance-logs');

exports.fetchStudents = async(req, res) => {
    try {
        let students = await Students.find();
        // students = students.map(stud => {
        //     return {...stud._doc, groups: stud.groups.map(async(groupId) => {
        //         const group = await Groups.findById(groupId);
        //         // console.log(group)
        //         return group;
        //         })
        //     }
        // });
        // console.log(students);
        res.json({students}).status(200);
    } catch(err) {
        console.log(err)
        res.json({done: false, error: err.message});
    }
}

exports.getStudentData = async(req, res) => {
    try {
        const id = req.params.id;
        const studentData = await Students.findOne({_id: id});
        res.json({done: true, studentData}).status(200);
    } catch(err) {
        console.log(err)
        res.json({done: false, error: err.message});
    }
}

exports.addStudent = async(req, res) => {
    try {
        const body = req.body;
        const newStudent = await Students(body).save();
        if(newStudent) {
            res.json({done: true, student: newStudent}).status(200);
        } else {
            res.json({done: false, error: "didn't added"});
        }
    } catch(err) {
        console.log(err)
        res.json({done: false, error: err.message});
    }
}

exports.editStudent = async(req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const updateStudent = await Students.updateOne({_id: id}, body);
        if(updateStudent.nModified == 1) {
            res.json({done: true}).status(200);
        } else {
            res.json({done: false, error: "didn't apdated"});
        }
    } catch(err) {
        console.log(err)
        res.json({done: false, error: err.message});
    }
}


exports.deleteStudent = async(req, res) => {
    try {
        const id = req.params.id;
        const deleteStudent = await Students.deleteOne({_id: id});
        if(deleteStudent) {
            res.json({done: true, id}).status(200);
        } else {
            res.json({done: false, error: "didn't deleted"});
        }
    } catch(err) {
        console.log(err)
        res.json({done: false, error: err.message});
    }
}

exports.attendStudent = async(req, res) => {
    try {
        const body = req.body;
        const groups = body.choosenGroups;
        delete body['choosenGroups'];
        const docs = [];
        groups.forEach(g => {
            docs.push({...body, groupId: g});
        });

        let already = false;
        const length = docs.length;
        for(let i=0; i<length; i++) {
            const log = await AttendanceLogs.find({studentId: docs[i].studentId, groupId: docs[i].groupId}).sort({date: -1});
            console.log(log.length);
            if(log.length > 0) {
                if(docs[i].date - log[0].date < 24*60*60*1000) {
                    already = true;
                    console.log(docs[i].date - log[0].date)
                    break;
                }
            }
        }
       console.log(already)
        if(!already) {
            const newLog = await AttendanceLogs.insertMany(docs);
            if(newLog) {
                res.json({done: true}).status(200);
            } else {
                res.json({done: false, error: "didn't added"});
            }
        } else {
            res.json({done: false, error: "هذا الطالب تم تسجيله بالفعل"});
        }
    } catch(err) {
        console.log(err)
        res.json({done: false, error: err.message});
    }
}

exports.getStudentAttendanceLog = async(req, res) => {
    try {
        const studentId = req.params.id;
        const log = await AttendanceLogs.find({studentId});
        res.status(200).json({log})
    } catch(err) {
        console.log(err)
        res.json({error: err.message});
    }
}
