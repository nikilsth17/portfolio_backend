import mongoose from "mongoose"



//set rule or schema
const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        minlength:5,
        maxlength:55,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:55,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:55,
    },
    gender:{
        type:String,
        required:true,
        trim:true,
        enum:["male","female","other"],
    },
    location:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:55,
    }
});



//create table
export const User= mongoose.model("User",userSchema);