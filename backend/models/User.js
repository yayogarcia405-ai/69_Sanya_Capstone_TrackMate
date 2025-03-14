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
    }
});

module.exports=mongoose.model("NewUser", UserSchema);