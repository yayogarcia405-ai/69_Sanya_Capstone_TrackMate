const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ManagerProfile = require("../models/ManagerProfile");

const router = express.Router();

// Set up Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "./uploads";
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Use timestamp to avoid filename conflicts
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Accept only images
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

// POST /api/profile - Save manager profile
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const { name } = req.body;
    const photo = req.file;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    // Check if a profile already exists (optional: update instead of creating new)
    let profile = await ManagerProfile.findOne();
    if (profile) {
      // Update existing profile
      profile.name = name;
      if (photo) {
        profile.photo = `/uploads/${photo.filename}`;
      }
      await profile.save();
    } else {
      // Create new profile
      profile = new ManagerProfile({
        name,
        photo: photo ? `/uploads/${photo.filename}` : null,
      });
      await profile.save();
    }

    res.status(200).json({ message: "Profile updated successfully", profile });
  } catch (error) {
    console.error("Error saving profile:", error);
    res.status(500).json({ message: `Error: ${error.message}` });
  }
});

// GET /api/profile - Retrieve manager profile
router.get("/", async (req, res) => {
  try {
    const profile = await ManagerProfile.findOne();
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: `Error: ${error.message}` });
  }
});

module.exports = router;