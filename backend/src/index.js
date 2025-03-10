const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
require("dotenv").config();
const PORT=5000;
const app=express();
const authRoutes=require('./routes/auth')

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Database Connected."))
.catch((err)=>console.log("Error connecting to database. Error: ",err));

app.use("/api/auth", authRoutes);


app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});