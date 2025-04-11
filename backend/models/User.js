const mongoose=require("mongoose");

const UserSchema= new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email: { 
        type: String, 
        required: true, 
        unique: true
    },
    password:{
        type: String, 
        required: true,
    },
    roles:{
        type: String, 
        required: true,
        enum: ["manager", "employee"]
    },
    department: {
        type: String,
        default: "", // Optional: gives you a blank value by default
      },
      document: {
        filename: { type: String, default: "" },
        path: { type: String, default: "" },
        uploadedAt: { type: Date, default: Date.now }
      }      
});

module.exports=mongoose.model("NewUser", UserSchema);