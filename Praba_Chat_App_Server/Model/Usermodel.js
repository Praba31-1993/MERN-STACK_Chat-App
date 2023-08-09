const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required:true,
    },
    lastName : {
        type: String,
        required:true,
    },
    email : {
        type: String,
        required:true,
    },
    password:{
        type: String,
        required:true,
    },
    conform_password:{
        type: String,
        required:true,
    },
    isActive:{
        type:Boolean,
        required:false

    },
    isDelete:{
        type:Boolean,
        required:false

    }
})
const UserModel = mongoose.model("users", UserSchema)
module.exports=UserModel
