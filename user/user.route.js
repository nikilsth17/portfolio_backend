import express from "express"
import { loginUser, registerUser } from "./user.service.js";


const router= express.Router();

//register user
router.post("/user/register",registerUser);


//login a user
router.post("/user/login",loginUser);

export default router;