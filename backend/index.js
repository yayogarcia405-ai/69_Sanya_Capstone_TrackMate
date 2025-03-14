const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = 5000;
const app = express();
const authRoutes = require('./routes/auth');
const { generateOTP, sendOTP, storeOTP, verifyOTP } = require("./utils/otpService");

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database connected."))
    .catch((err) => console.log("Error connecting to database. Error:", err));

// Routes
app.use("/api/auth", authRoutes);

// Send OTP via Email
app.post("/otp-login", async (req, res) => {
    const { email } = req.body;
    // console.log(email)
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        const otp = generateOTP();
        // console.log(otp)
        await sendOTP(email, otp); // Send OTP via email
        storeOTP(email, otp); // Store OTP
        res.json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("OTP send error:", error.message);
        res.status(500).json({ error: "Failed to send OTP" });
    }
});

// Verify OTP
app.post("/verify-otp", (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ error: "Email and OTP are required" });
    }

    if (verifyOTP(email, otp)) {
        res.json({ message: "OTP verified successfully" });
    } else {
        res.status(400).json({ error: "Invalid or expired OTP" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. Open server on: http://localhost:${PORT}`);
});