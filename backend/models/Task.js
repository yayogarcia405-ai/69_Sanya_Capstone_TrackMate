const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NewUser',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['upcoming', 'completed'],
    default: 'upcoming',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  log: {
    checkInTime: { type: Date, default: null },
    checkOutTime: { type: Date, default: null },
    checkInPhoto: { type: String, default: null },
    checkOutPhoto: { type: String, default: null },
    checkInLocation: { type: String, default: null },
    checkOutLocation: { type: String, default: null },
  },
});

module.exports = mongoose.models.Task || mongoose.model('Task', taskSchema);