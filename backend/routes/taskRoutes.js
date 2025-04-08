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

  router.put('/:taskId', async (req, res) => {
    try {
      const updated = await Task.findByIdAndUpdate(req.params.taskId, { status: 'completed' });
      res.status(200).json({ message: 'Task marked as completed' });
      await updated.save()
    } catch (error) {
      res.status(500).json({ error: 'Failed to update task' });
    }
  });
  
  module.exports = router;