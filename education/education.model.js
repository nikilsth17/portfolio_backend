import mongoose from "mongoose"


export const educationSchema= new mongoose.Schema({
    collegeName:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:55,
    },
    grade:{
        type:Number,
        required:true,
        minlength:2,
        maxlength:55,
    },
    introduction:{
        type:String,
        required:true,
        trim:true,
        minlength:10,
    },
    location:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:55,
    },
    degree:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:55,
    },
    date: {
        type: mongoose.Schema.Types.Mixed, // or you can choose one type, e.g., type: String
        trim: true,
        minlength: 2,
        maxlength: 20,
    },
});


export const Education= mongoose.model("Education",educationSchema);