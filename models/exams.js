const mongoose = require('mongoose');

const exam = mongoose.Schema({
  groupId: {
    type: String,
  },
  date: {
    type: String,
  },
  
});

module.exports = mongoose.model('exam', exam);