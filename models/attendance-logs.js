const mongoose = require('mongoose');

const attendanceLog = mongoose.Schema({
  studentId: {
    type: String,
  },
  groupId: {
    type: String,
  },
  date: {
    type: Number,
  },
  isGuest: {
    type: Boolean,
    default: false
  },
  isExam: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('attendanceLog', attendanceLog);