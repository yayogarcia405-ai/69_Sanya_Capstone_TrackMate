// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const User=require('../models/User');
const jwt=require("jsonwebtoken");

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

  // Middleware to verify JWT token
  const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    console.log('Raw Authorization header:', authHeader);
    const token = authHeader?.replace('Bearer ', '');
    if (!token) {
      console.log("No token provided in request");
      return res.status(401).json({ error: 'No token provided' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // { userId, role }
      console.log("Decoded token:", decoded); // Debug
      next();
    } catch (error) {
      console.error("Token verification error:", error);
      res.status(401).json({ error: 'Invalid token' });
    }
  };  

// GET - from taskId
// Fetch task by taskId (POST to support body)
// router.post('/tasks', authMiddleware, async (req, res) => {
//   try {
//     const { taskId } = req.body;
//     console.log("Requested taskId from body:", taskId);

//     if (!taskId || !taskId.match(/^[0-9a-fA-F]{24}$/)) {
//       console.log("Invalid taskId format:", taskId);
//       return res.status(400).json({ error: 'Invalid task ID format' });
//     }

//     const task = await Task.findById(taskId);
//     if (!task) {
//       console.log("Task not found for ID:", taskId);
//       return res.status(404).json({ error: 'Task not found' });
//     }

//     if (task.employeeId.toString() !== req.user.id) {
//       console.log("Employee ID mismatch");
//       return res.status(403).json({ error: 'Unauthorized: Task not assigned to this employee' });
//     }

//     res.status(200).json(task);
//   } catch (error) {
//     console.error("Fetch task error:", error.message);
//     res.status(500).json({ error: 'Failed to fetch task' });
//   }
// });
router.post('/tasks', authMiddleware, async (req, res) => {
  try {
    const { taskId } = req.body;
    console.log('Full request body:', req.body);
    console.log('Requested taskId from body:', taskId);

    if (!taskId || !taskId.match(/^[0-9a-fA-F]{24}$/)) {
      console.log('Invalid taskId format:', taskId);
      return res.status(400).json({ error: 'Invalid task ID format' });
    }

    if (req.user.role === 'manager') {
      // Managers can access all tasks (specific or all)
      const tasks = taskId ? await Task.findById(taskId) : await Task.find();
      if (!tasks) {
        console.log('No tasks found for manager access');
        return res.status(404).json({ error: 'No tasks found' });
      }
      console.log('Tasks returned to manager:', tasks);
      res.status(200).json(tasks);
    } else if (req.user.role === 'employee') {
      // Employees can only access their assigned tasks
      const task = await Task.findById(taskId);
      if (!task) {
        console.log('Task not found for ID:', taskId);
        return res.status(404).json({ error: 'Task not found' });
      }
      console.log('Task employeeId:', task.employeeId.toString());
      console.log('User ID from token:', req.user.id);
      if (task.employeeId.toString() !== req.user.id) {
        console.log('Permission denied: Not assigned employee');
        return res.status(403).json({ error: 'Unauthorized: Task not assigned to this employee' });
      }
      res.status(200).json(task);
    } else {
      console.log('Permission denied: Invalid role');
      return res.status(403).json({ error: 'Unauthorized: Invalid role' });
    }
  } catch (error) {
    console.error('Fetch task error:', error.message);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});
// Update task status and log
router.put('/tasks/:taskId', authMiddleware, async (req, res) => {
  try {
    console.log("Route /tasks/:taskId (PUT) reached");
    console.log("Request body:", req.body);
    const { status, employeeId, checkInTime, checkOutTime, checkInPhoto, checkOutPhoto, checkInLocation, checkOutLocation } = req.body;

    const task = await Task.findById(req.params.taskId);
    if (!task) {
      console.log("Task not found for ID:", req.params.taskId);
      return res.status(404).json({ error: 'Task not found' });
    }

    console.log("Task employeeId:", task.employeeId, "Request employeeId:", employeeId);
    if (!employeeId || task.employeeId.toString() !== employeeId) {
      console.log("Employee ID mismatch or not provided");
      return res.status(400).json({ error: 'Employee ID not found for this task' });
    }

    task.status = status || task.status;
    task.log.checkInTime = checkInTime || task.log.checkInTime;
    task.log.checkOutTime = checkOutTime || task.log.checkOutTime;
    task.log.checkInPhoto = checkInPhoto || task.log.checkInPhoto;
    task.log.checkOutPhoto = checkOutPhoto || task.log.checkOutPhoto;
    task.log.checkInLocation = checkInLocation || task.log.checkInLocation;
    task.log.checkOutLocation = checkOutLocation || task.log.checkOutLocation;

    await task.save();
    console.log("Updated task:", task);
    res.status(200).json(task);
  } catch (error) {
    console.error("Update task error:", error.message);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Upload check-in photo
router.post('/tasks/:id/photo/check-in', express.text({ type: '*/*' }), async (req, res) => {
  const { id } = req.params;
  const checkInPhoto = req.body;

  console.log('Check-In Photo Upload:', { id, hasPhoto: !!checkInPhoto });

  try {
    const task = await Task.findByIdAndUpdate(id, { checkInPhoto }, { new: true });
    if (!task) {
      console.log('Task not found for ID:', id);
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Check-In photo saved!', task });
  } catch (err) {
    console.error('🔥 Error saving check-in photo:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Upload check-out photo
router.post('/tasks/:id/photo/check-out', express.text({ type: '*/*' }), async (req, res) => {
  const { id } = req.params;
  const checkOutPhoto = req.body;

  console.log('Check-Out Photo Upload:', { id, hasPhoto: !!checkOutPhoto });

  try {
    const task = await Task.findByIdAndUpdate(id, { checkOutPhoto }, { new: true });
    if (!task) {
      console.log('Task not found for ID:', id);
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Check-Out photo saved!', task });
  } catch (err) {
    console.error('🔥 Error saving check-out photo:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// router.put('/tasks/:taskId', async (req, res) => {
//   try {
//     const { status, employeeId } = req.body;
//     const task = await Task.findById(req.params.taskId);

//     if (!task) {
//       return res.status(404).json({ error: 'Task not found' });
//     }

//     // Validate employeeId
//     if (task.employeeId.toString() !== employeeId) {
//       return res.status(400).json({ error: 'Employee ID not found for this task' });
//     }

//     task.status = status || task.status;
//     await task.save();

//     res.status(200).json(task);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to update task' });
//   }
// });

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

// PUT /tasks/:taskId - Update task with logs and status
// router.put('/tasks/:taskId', authMiddleware, async (req, res) => {
//   try {
//     console.log("Route /tasks/:taskId (PUT) reached");
//     console.log("Request body:", req.body);
//     const { status, employeeId, checkInTime, checkOutTime, checkInPhoto, checkOutPhoto, checkInLocation, checkOutLocation } = req.body;

//     const task = await Task.findById(req.params.taskId);
//     if (!task) {
//       console.log("Task not found for ID:", req.params.taskId);
//       return res.status(404).json({ error: 'Task not found' });
//     }

//     console.log("Task employeeId:", task.employeeId, "Request employeeId:", employeeId);
//     if (!employeeId || task.employeeId.toString() !== employeeId) {
//       console.log("Employee ID mismatch or not provided");
//       return res.status(400).json({ error: 'Employee ID not found for this task' });
//     }

//     // Update task status
//     task.status = status || task.status;

//     // Update log subdocument
//     task.log.checkInTime = checkInTime || task.log.checkInTime;
//     task.log.checkOutTime = checkOutTime || task.log.checkOutTime;
//     task.log.checkInPhoto = checkInPhoto || task.log.checkInPhoto;
//     task.log.checkOutPhoto = checkOutPhoto || task.log.checkOutPhoto;
//     task.log.checkInLocation = checkInLocation || task.log.checkInLocation;
//     task.log.checkOutLocation = checkOutLocation || task.log.checkOutLocation;

//     await task.save();
//     console.log("Updated task:", task);
//     res.status(200).json(task);
//   } catch (error) {
//     console.error("Update task error:", error.message);
//     res.status(500).json({ error: 'Failed to update task' });
//   }
// });
  
// router.post('/tasks/:id/photo/check-in', express.text({ type: '*/*' }), async (req, res) => {
//     const { id } = req.params;
//     const checkInPhoto = req.body;
  
//     console.log('Check-In Photo Upload:', { id, hasPhoto: !!checkInPhoto });
  
//     try {
//       const task = await Task.findByIdAndUpdate(id, { checkInPhoto }, { new: true });
//       if (!task) {
//         console.log('Task not found for ID:', id);
//         return res.status(404).json({ message: 'Task not found' });
//       }
  
//       res.status(200).json({ message: 'Check-In photo saved!', task });
//     } catch (err) {
//       console.error('🔥 Error saving check-in photo:', err);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   });
  
  
  
// POST /tasks/:id/photo/check-out
// router.post('/tasks/:id/photo/check-out', express.text({ type: '*/*' }), async (req, res) => {
//     const { id } = req.params;
//     const checkOutPhoto = req.body;
  
//     try {
//       const task = await Task.findByIdAndUpdate(id, { checkOutPhoto }, { new: true });
//       if (!task) return res.status(404).json({ message: 'Task not found' });
  
//       res.status(200).json({ message: 'Check-Out photo saved!', task });
//     } catch (err) {
//       console.error('Error saving check-out photo:', err);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   });



  module.exports = router;