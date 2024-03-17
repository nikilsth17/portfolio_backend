import express from "express";
import { contactUser } from "./contact.service.js";



const router= express.Router();

//add a contact of user
router.post("/contact/add",contactUser);


export default router;