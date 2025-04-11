const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const otpService = require("../utils/otpService");
const {verifyOTP}=require("../utils/otpService")
const app = express();
const multer = require("multer");
const path = require("path");

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); 
    },
    filename: function (req, file, cb) {
      const uniqueName = Date.now() + "-" + file.originalname;
      cb(null, uniqueName);
    }
  });
  
const upload = multer({ storage });
router.get("/employees", async (req, res) => {
    try {
      const employees = await User.find({ roles: "employee" }).select("-password"); // hide password
      res.status(200).json(employees);
    } catch (err) {
      console.error("Error fetching employees:", err);
      res.status(500).json({ message: "Failed to fetch employees." });
    }
  });
  router.get("/managers", async (req, res) => {
  try {
    const managers = await User.find({ roles: "manager" }).select("-password");
    res.status(200).json(managers);
  } catch (err) {
    console.error("Error fetching managers:", err);
    res.status(500).json({ message: "Failed to fetch managers." });
  }
});
router.post("/manager/signup", [
    body("username").notEmpty().withMessage("Username cannot be empty."),
    body("email").isEmail().withMessage("Valid email is required."),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters."),
    body("roles").isIn(["manager", "employee"]).withMessage("Role must be 'manager' or 'employee'.")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, roles } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already registered." });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ username, email, password: hashedPassword, roles });
        await user.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        console.error("Signup Error:", err.message);
        res.status(500).json({ message: "Server error." });
    }
});

router.post("/employee/signup",  upload.single("document"), [
    body("username").notEmpty().withMessage("Username cannot be empty"),
    body("email").isEmail().withMessage("Valid email is required."),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters."),
    body("role").equals("employee").withMessage("Role must be 'employee'.")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, role } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already registered." });

        const hashedPassword = await bcrypt.hash(password, 10);
        let document = null;
        if (req.file) {
            // Validate file type and size if needed
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
            if (!allowedTypes.includes(req.file.mimetype)) {
                return res.status(400).json({
                    message: "Invalid file type. Only PDF, JPEG, and PNG are allowed.",
                    field: "document"
                });
            }

            // Max size 5MB
            if (req.file.size > 5 * 1024 * 1024) {
                return res.status(400).json({
                    message: "File size too large. Maximum 5MB allowed.",
                    field: "document"
                });
            }

            document = {
                filename: req.file.originalname,
                path: `/uploads/${req.file.filename}`, // Use forward slash for web compatibility
                mimetype: req.file.mimetype,
                size: req.file.size,
                uploadedAt: new Date()
            };
        }
        user = new User({ username, email, password: hashedPassword, roles: role, document});
        await user.save();
        const userResponse = user.toObject();
        delete userResponse.password;
        res.status(201).json({ 
            success: true,
            message: "Employee registered successfully!",
            user: userResponse
        });
    } catch (err) {
        console.error("Signup Error:", err);
        
        // Clean up uploaded file if error occurred
        if (req.file) {
            fs.unlink(req.file.path, (unlinkErr) => {
                if (unlinkErr) console.error("Error deleting uploaded file:", unlinkErr);
            });
        }

        res.status(500).json({ 
            success: false,
            message: "Server error during registration.",
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});

router.post("/manager/login", [
    body("email").isEmail().withMessage("Invalid email entered."),
    body("password").notEmpty().withMessage("Password is required."),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, roles: "manager" });
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
    body("email").isEmail().withMessage("Invalid email entered."),
    body("password").notEmpty().withMessage("Password is required."),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, roles: "employee" });
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

// Forgot Password - Send OTP via Email
router.post("/forgot-password", [
    body("email").isEmail().withMessage("Valid email is required.")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found." });

        const otp = otpService.generateOTP();
        otpService.sendOTP(email, otp);
        otpService.storeOTP(email, otp);
        
        return res.status(200).json({ message: "OTP sent successfully." });
    } catch (err) {
        console.error("Forgot Password Error:", err);
        return res.status(500).json({ message: "Server error." });
    }
});


// OTP Login - Send OTP via Email
router.post("/otp-login", [
    body("email").isEmail().withMessage("Valid email is required.")
], async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    const otp = otpService.generateOTP();
    // console.log(otp)
    otpService.sendOTP(email, otp);
    otpService.storeOTP(email, otp);

    return res.status(200).json({ message: "OTP sent successfully." });
});

// OTP Login - Verify and Authenticate
router.post("/verify-otp", [
    body("email").isEmail().withMessage("Valid email is required."),
    body("otp").notEmpty().withMessage("OTP is required.")
], 
async (req, res) => {

    const { email, otp } = req.body;

    try {
        const isValidOtp = verifyOTP(email, otp);
        if (!isValidOtp) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.roles },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        return res.json({ success: true, message: "OTP verified successfully", token, role: user.roles });

    } catch (error) {
        console.error("Error in OTP verification:", error);
        return res.status(500).json({ message: "Server error" });
    }

});

// // Forgot Password - Send OTP
// router.post("/forgot-password", async (req, res) => {
//     const { email } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const otp = Math.floor(100000 + Math.random() * 900000).toString();
//         storeOTP(email, otp); // Store OTP with expiry
//         await sendOTP(email, otp); // Send OTP via email

//         return res.json({ message: "OTP sent to your email" });
//     } catch (error) {
//         console.error("Error in forgot password:", error);
//         return res.status(500).json({ message: "Server error" });
//     }
// });

// Verify OTP for Password Reset
router.post("/verify-reset-otp", async (req, res) => {
    const { email, otp } = req.body;

    try {
        const isValid = verifyOTP(email, otp);
        if (!isValid) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        return res.json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

router.post("/reset-password", async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user's password
        user.password = hashedPassword;
        await user.save();

        return res.json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

router.put("/employees/:id/department", async (req, res) => {
    const { id } = req.params;
    const { department } = req.body;
  
    try {
      const updatedEmployee = await User.findByIdAndUpdate(
        id,
        { department },
        { new: true } // returns the updated doc
      );
  
      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      res.status(200).json(updatedEmployee);
    } catch (err) {
      console.error("Error updating department:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
module.exports = router;
