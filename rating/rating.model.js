import mongoose from "mongoose";


export const ratingSchema= new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
        minlength:2,
        maxlength:55,
        trim: true,
    },
    profession:{
        type: String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:55,
    },
    design:{
        type:Number,
        required:true,
    },
    functionality:{
        type:Number,
        required:true
    },
    responsiveness:{
        type:Number,
        required:true
    },
    performance:{
        type:Number,
        required:true
    },
    contentQuality:{
        type:Number,
        required:true
    },
    suggestion:{
        type:String,
        trim:true,
        minlength:10,
        maxlength:500
    },
    totalRating:{
        type:Number,
        required: true
    }
});


export const Rating= mongoose.model("Rating",ratingSchema); 