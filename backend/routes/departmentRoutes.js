const express = require('express');
const router = express.Router();
const Department = require('../models/Department');

// GET all departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find().select('name _id');
    res.status(200).json(departments);
  } catch (err) {
    console.error('Error fetching departments:', err);
    res.status(500).json({ message: 'Failed to fetch departments' });
  }
});

// POST add a new department
router.post('/', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Department name is required' });
  }

  try {
    const existingDepartment = await Department.findOne({ name });
    if (existingDepartment) {
      return res.status(400).json({ message: 'Department already exists' });
    }

    const department = new Department({ name });
    await department.save();
    res.status(201).json(department);
  } catch (err) {
    console.error('Error adding department:', err);
    res.status(500).json({ message: 'Failed to add department', error: err.message });
  }
});

// DELETE a department
router.delete('/:departmentId', async (req, res) => {
  const { departmentId } = req.params;

  try {
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    await Department.deleteOne({ _id: departmentId });
    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (err) {
    console.error('Error deleting department:', err);
    res.status(500).json({ message: 'Failed to delete department', error: err.message });
  }
});

module.exports = router;