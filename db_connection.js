import mongoose from "mongoose";

export const db_connect= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connection successfull..");
    } catch (error) {
        console.log("Database connection failed..");
        console.log(error.message);
    }
}