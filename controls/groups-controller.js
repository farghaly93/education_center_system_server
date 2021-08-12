const Groups = require('../models/groups');
const Students = require('../models/students');
const AttendanceLogs = require('../models/attendance-logs');

exports.fetchGroups = async(req, res) => {
    try {
        const groups = await Groups.find();
        res.json({groups}).status(200);
    } catch(err) {
        console.log(err)
        res.json({done: false, error: err.message});
    }
}

exports.getGroupData = async(req, res) => {
    try {
        const id = req.params.id;
        const groupData = await Groups.findOne({_id: id});
        res.json({done: true, groupData}).status(200);
    } catch(err) {
        console.log(err)
        res.json({done: false, error: err.message});
    }
}

exports.addGroup = async(req, res) => {
    try {
        const body = req.body;
        const newGroup = await Groups(body).save();
        if(newGroup) {
            res.json({done: true}).status(200);
        } else {
            res.json({done: false, error: "didn't added"});
        }
    } catch(err) {
        console.log(err)
        res.json({done: false, error: err.message});
    }
}

exports.editGroup = async(req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const updateGroup = await Groups.updateOne({_id: id}, body);
        if(updateGroup.nModified == 1) {
            res.json({done: true}).status(200);
        } else {
            res.json({done: false, error: "didn't apdated"});
        }
    } catch(err) {
        console.log(err)
        res.json({done: false, error: err.message});
    }
}

exports.deleteGroup = async(req, res) => {
    try {
        const id = req.params.id;
        const deleteGroup = await Groups.deleteOne({_id: id});
        if(deleteGroup) {
            res.json({done: true, id}).status(200);
        } else {
            res.json({done: false, error: "didn't deleted"});
        }
    } catch(err) {
        console.log(err)
        res.json({done: false, error: err.message});
    }
}

exports.getTodayGroups = async(req, res) => {
    try {
        const day = new Date().getDay();
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const today = days[day];
        const today_Groups = await Groups.find({day: today});
        const todayGroups = today_Groups.map(tg => tg._id);
        res.status(200).json({todayGroups})
    } catch(err) {
        console.log(err)
        res.json({done: false, error: err.message});
    }
}

exports.getGroupAttendanceLog = async(req, res) => {
    try {
        const groupId = req.params.id;
        const log = await AttendanceLogs.find({groupId});
        res.status(200).json({log})
    } catch(err) {
        console.log(err)
        res.json({error: err.message});
    }
}

exports.getGroupAttendanceLogByDate = async(req, res) => {
    try {
        const groupId = req.params.id;
        const date = new Date(req.params.date).getTime();
        const nextDay = date + 24*60*60*1000;
        const lastDay = date - 24*60*60*1000;
        const log = await AttendanceLogs.find({groupId, date: {$lt: nextDay, $gt: lastDay}});
        console.log(log)
        res.status(200).json({log})
    } catch(err) {
        console.log(err)
        res.json({error: err.message});
    }
}

