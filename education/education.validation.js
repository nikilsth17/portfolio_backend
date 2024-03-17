import Joi from "joi";


export const addEducationValidationSchema= Joi.object({
    collegeName: Joi.string().required().trim().min(2).max(55),
    grade: Joi.number().required().min(2).max(55),
    location: Joi.string().required().trim().max(55),   
    introduction: Joi.string().required().trim().min(10),
    degree: Joi.string().trim().min(2).max(55),
    date: Joi.string().min(2).max(20),
})


export const paginationValidationSchema= Joi.object({
    page:Joi.number().integer().min(1).required(),
    limit: Joi.number().integer().min(1),
});