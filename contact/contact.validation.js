import Joi from "joi";



export const addContactValidationSchema= Joi.object({
    fullName:Joi.string().min(7).max(55).required().trim(),
    email: Joi.string().required().trim().min(7).max(55),
    location: Joi.string().required().trim().max(55),
    message: Joi.string().required().trim().max(55),
})