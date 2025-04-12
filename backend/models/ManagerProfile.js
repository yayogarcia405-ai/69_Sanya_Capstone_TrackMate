const mongoose = require("mongoose");

const managerProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String, // Store the file path (e.g., /uploads/filename.jpg)
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ManagerProfile", managerProfileSchema);