import express from "express"
import { db_connect } from "./db_connection.js";
import userRoutes from "./user/user.route.js";
import contactRoutes from "./contact/contact.route.js"
import educationRoutes from "./education/education.route.js"
import ratingRoutes from "./rating/rating.route.js"
import cors from "cors";

const app=express();

app.use(cors({origin:"*"}));

app.use(express.json());
app.use(userRoutes);
app.use(contactRoutes);
app.use(educationRoutes)
app.use(ratingRoutes);

await db_connect();

//create port
const port= process.env.PORT;

app.listen(port,()=>{
    console.log(`App is listening on port ${port}.`);
});