const mongoose = require('mongoose');

const group = mongoose.Schema({
  number: {
    type: Number,
    default: 1,
    unique: true
  },
  teacherName: {
    type: String,
    default: ''
  },
  teacherPhone: {
    type: String,
    default: ''
  },
  stage: {
    type: Number,
    default: 3
  },
  subject: {
    type: String,
    default: ''
  },
  day: {
    type: String,
    default: ''
  },
  timeFrom: {
    type: String,
    default: ''
  },
  
});

module.exports = mongoose.model('group',group);