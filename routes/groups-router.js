const express = require('express');
const router = express.Router();
const groupsControl = require('../controls/groups-controller');


router.post('/addGroup', groupsControl.addGroup);
router.post('/editGroup/:id', groupsControl.editGroup);
router.get('/deleteGroup:id', groupsControl.deleteGroup);
router.get('/fetchGroups', groupsControl.fetchGroups);
router.get('/getGroupData/:id', groupsControl.getGroupData);
router.get('/getTodayGroups', groupsControl.getTodayGroups);
router.get('/getGroupAttendanceLog/:id', groupsControl.getGroupAttendanceLog);
router.get('/getGroupAttendanceLogByDate/:id/:date', groupsControl.getGroupAttendanceLogByDate);

module.exports = router;
