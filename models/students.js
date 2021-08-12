const mongoose = require('mongoose');

const student = mongoose.Schema({
  name: {
    type: String,
    default: 1,
  },
  phone: {
    type: String,
    default: '',
    unique: true,
  },
  stage: {
    type: Number,
    default: 1
  },
  address: {
    type: String,
    default: ''
  },
  groups: {
    type: Array,
    default: []
  },
  active: {
    type: Boolean,
    default: false
  }
  
});

module.exports = mongoose.model('student', student);