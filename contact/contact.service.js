import { Contact } from "./contact.model.js";
import { addContactValidationSchema } from "./contact.validation.js";





export const contactUser=async(req,res)=>{
    //extract contact from req.body
    const newContact= req.body;

    //validate contact using Joi
    try {
        await addContactValidationSchema.validateAsync(newContact);
    } catch (error) {
        return res.status(400).send({message:error.message});
    }
    await Contact.create(newContact);

    //send response
    return res.status(201).send({message:"Contact of user is added successfully."});
}