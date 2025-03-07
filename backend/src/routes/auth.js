const express=require("express");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const {body, validationResult}=require("express-validator");
const User=require('../models/User');

const router=express.Router();
const JWT_SECRET=process.env.JWT_SECRET;

// Registering a user
 router.post("/signup",[
    body("username").notEmpty().withMessage("Username is required."),
    body("password").isLength({min: 6}).withMessage("Password must atleast contain minimum 6 characters."),
 ],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const {username, password}= req.body;
    try{
        let user=await User.findOne({username});
        if (user) return res.status(400).json({message: "User already exists."});

        const hashedPassword= await bcrypt.hash(password, 10);
        user= new User({username, password:hashedPassword});
        await user.save();

        res.status(201).json({message: "User registered successfully!"});
    }catch (err){
        res.status(500).json({message: "Server error."})
    }
 });

 // Login user

 router.post("/login", async(req,res)=>{
    const{username, password}=req.body;

    try{
        const user=await User.findOne({username});
        if (!user) return res.status(400).json({message: "Invalid credentials."});

        const isMatch= await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: "invalid credentials."});

        const token=jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: "1h"});
        res.json({token});
    } catch(err){
        res.status(500).json({message: "Server error."});
    }
 });


 // Verifying token 

 router.get("/protected", async (req, res) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        res.json({ message: "Access granted", user: req.user });
    } catch (err) {
        res.status(401).json({ message: "Invalid Token" });
    }
});

module.exports = router;
