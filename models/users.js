const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema=new Schema({
    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true, 
    },
    userName:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true,
    }
})
module.exports=mongoose.model("users",userSchema)