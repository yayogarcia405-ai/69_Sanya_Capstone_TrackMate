// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

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
  
    try {
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
      res.status(201).json({ message: "Task created", task: newTask });
    } catch (err) {
      console.error("Error creating task:", err);
      res.status(500).json({ message: "Failed to create task", error: err });
    }
  });
  

// routes/taskRoutes.js
router.get('/tasks/:employeeId', async (req, res) => {
    try {
      const tasks = await Task.find({ employeeId: req.params.employeeId });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  });

  router.put('/:taskId', async (req, res) => {
    try {
      const updated = await Task.findByIdAndUpdate(req.params.taskId, { status: 'completed' });
      res.status(200).json({ message: 'Task marked as completed' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update task' });
    }
  });
  
  module.exports = router;