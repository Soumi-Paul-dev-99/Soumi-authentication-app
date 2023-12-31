const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },

    password:{
        type:String,
      
    },
    token:{
        type:String,
      
    },
    role:{
        type: String,
        default: "Basic",
        required: true
    },
})

const User = mongoose.model("user",userSchema);
module.exports = User;