// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const User=require('../models/User')

router.post("/add-tasks", async (req, res) => {
    const {
      employeeId,
      date,
      time,
      address,
      pincode,
      city,
      description,
    } = req.body;
    if (!date || !time || !address || !pincode || !city || !description){
        return res.status(400).json({message: "Fields are missing."})
    }
    try {
      const employee = await User.findById(employeeId);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found." });
      }
      const newTask = new Task({
        employeeId,
        date,
        time,
        address,
        pincode,
        city,
        description,
      });
  
      await newTask.save();
      res.status(201).json({ message: "Task created!", task: newTask });
    } catch (err) {
      console.error("Error creating task:", err);
      res.status(500).json({ message: "Failed to create task.", error: err });
    }
  });
  

router.get('/tasks/:employeeId', async (req, res) => {
    try {
      const tasks = await Task.find({ employeeId: req.params.employeeId });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tasks.' });
    }
  });

  // GET task by ID
router.get('/tasks/:taskId', async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// PUT update task status by ID
router.get('/tasks/id/:taskId', async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});
 // routes/taskRoutes.js
router.put('/:taskId', async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.taskId, { completed: true }, { new: true });
    res.status(200).json({ message: 'Task marked as completed', task: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

router.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
  
  module.exports = router;