import { Education } from "./education.model.js";
import {
  addEducationValidationSchema,
  paginationValidationSchema,
} from "./education.validation.js";
import mongoose from "mongoose";

export const addEducation = async (req, res) => {
  //extract education from req.body
  const newEducation = req.body;

  //validate education using Joi
  try {
    await addEducationValidationSchema.validateAsync(newEducation);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
  await Education.create(newEducation);
  return res
    .status(201)
    .send({ message: "Education of user is added successfully." });
};

//edit the educational level
export const editEducation = async (req, res) => {
  const educationId = req.params.id;
  const newValues = req.body;
  //validate id from mongoId validity
  const isValidMongoId = mongoose.Types.ObjectId.isValid(educationId);
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongoId.." });
  }

  //validate newvalues from req.body
  try {
    await addEducationValidationSchema.validateAsync(newValues);
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }

  //check for education existence using educationId
  const education = await Education.findOne({ _id: educationId });
  if (!education) {
    return res.status(400).send({ message: "Education of user not exists..." });
  }

  //check if userinfo is include to education
  // It checks if the user property of education exists and then calls the equals method to compare it with req.userInfo._id.
  // If education is undefined or does not have a user property, the entire expression education.user && education.user.equals(req.userInfo._id) will be false.
  const isOwnerOfEducation =
    education.user && education.user.equals(req.userInfo._id);
  if (isOwnerOfEducation) {
    return res
      .status(403)
      .send({
        message: "The information of education isnot belong to this user.",
      });
  }

  //update education
  await Education.updateOne({ _id: educationId }, newValues);
  return res
    .status(200)
    .send({ message: "the education of user is successfully updated.." });
};

//get all education details
export const allEducation = async (req, res) => {
  const paginationDetails = req.body;
  try {
    await paginationValidationSchema.validateAsync(paginationDetails);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
  //calculate skip
  const skip = (paginationDetails.page - 1) * paginationDetails.limit;

  let match = {};
  //start find query
  const educations = await Education.aggregate([
    {
      $match: match,
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: paginationDetails.limit,
    },
    {
      $project: {
        collegeName: 1,
        grade: 1,
        location: 1,
        degree: 1,
        introduction: 1,
        date: 1,
      },
    },
  ]);

  return res.status(200).send({ educations });
};


//delete the education
export const deleteEducation=async(req,res)=>{
    // extract id from params 
    const educationId= req.params.id;
    // validate id for mongo id validity
    const isValidMongoId= mongoose.Types.ObjectId.isValid(educationId);
    // if not valid mongoId Deadline, terminate
    if (!isValidMongoId){
        return res.status(401).send({message:"Invalid mongoId.."});
    }
    // find product 
    const education = await Education.findOne({_id:educationId});        //or findById(productId)
    // if not product, terminate
    if (!education){
        return res.status(404).send({message:"The information of education doesnot exists....."});
    }
    // check for product owernship
    const isOwnerOfEducation =
    education.user && education.user.equals(req.userInfo._id);
  if (isOwnerOfEducation) {
    return res
      .status(403)
      .send({
        message: "The information of education isnot belong to this user.",
      });
  }
    
    // delete product 
    await Education.deleteOne({_id:educationId});
    //send response 
    return res.status(200).send({message:"The information of education is delete successfully."});
};