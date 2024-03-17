import mongoose from "mongoose"


export const contactSchema= new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:55,
    },
    email:{
        type:String,
        required:true,
        trim: true,
        lowercase: true,
        minlength:5,
        maxlength: 55,
    },
    location:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:55,
    },
    message:{
        type:String,
        required:true,
        trim:true,
        maxlength:55
    }
})

export const Contact= mongoose.model("Contact",contactSchema);