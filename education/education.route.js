import express from "express";
import { addEducation, allEducation, editEducation } from "./education.service.js";


const router= express.Router();


//add the education
router.post("/education/add",addEducation);


//edit the education level
router.put("/education/edit/:id",editEducation);

//get all the education
router.post("/education/all",allEducation);

export default router;