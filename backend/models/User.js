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
});

module.exports=mongoose.model("NewUser", UserSchema);