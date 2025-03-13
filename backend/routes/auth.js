const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

router.post("/manager/signup", [
    body("username").notEmpty().withMessage("Username cannot be empty."),
    body("phone").isMobilePhone().withMessage("Valid phone number is required."),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters."),
    body("roles").isIn(["manager", "employee"]).withMessage("Role must be 'manager' or 'employee'.")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, phone, password, roles} = req.body;
    try {
        let user = await User.findOne({ phone });
        if (user) return res.status(400).json({ message: "Phone number already registered." });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ username, phone, password: hashedPassword, roles });
        await user.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ message: "Server error." });
    }
});

router.post("/employee/signup", [
    body("username").notEmpty().withMessage("Username cannot be empty"),
    body("phone").isMobilePhone().withMessage("Valid phone number is required."),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters."),
    body("role").equals("employee").withMessage("Role must be 'employee'.") // Validate role as 'employee'
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, phone, password, role } = req.body;
    try {
        let user = await User.findOne({ phone });
        if (user) return res.status(400).json({ message: "Phone number already registered." });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ username, phone, password: hashedPassword, roles: role }); // Save as roles
        await user.save();

        res.status(201).json({ message: "Employee registered successfully!" });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ message: "Server error." });
    }
});


router.post("/manager/login", [
    body("phone").isMobilePhone().withMessage("Invalid phone number entered."),
    body("password").notEmpty().withMessage("Password is required."),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { phone, password } = req.body;
    try {
        const user = await User.findOne({ phone, roles: "manager" });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        res.status(200).json({ message: "Login successful!", user });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server error." });
    }
});

router.post("/employee/login", [
    body("phone").isMobilePhone().withMessage("Invalid phone number entered"),
    body("password").notEmpty().withMessage("Password is required."),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { phone, password } = req.body;
    try {
        const user = await User.findOne({ phone, roles: "employee" });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        res.status(200).json({ message: "Login successful!", user });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server error." });
    }
});


module.exports = router;
