const mongoose = require('mongoose');

var Expense = mongoose.model('Expense', {
  type: {
    type: String,
    trim: true,
    default: 'Secret mode'
  },
  name: {
    type: String,
    default: 'Secret expense'
  },
  amount: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: new Date()
  },
  updated_at: {
    type: Date,
    default: new Date()
  }
});

module.exports = {
  Expense
};
