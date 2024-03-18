import express from "express";
import { paginationRatingValidationSchema, ratingValidationSchema } from "./rating.validation.js";
import { Rating } from "./rating.model.js";

const router= express.Router();

const getShortName = async (fullName) => {
    // For simplicity, let's say the short name is the first letter of each word in the full name.
    const words = fullName.split(' ');
    const shortName = words.map((word) => word[0]).join('');
    return shortName;
  };


// add the rating input by the user
router.post("/rating/add",async(req,res)=>{
    try {
        // Validate the request payload
        const { error } = ratingValidationSchema.validate(req.body);
        if (error) {
          return res.status(400).send({ error: error.details[0].message });
        }
    
        // Calculate total rating
        const { design, functionality, responsiveness, contentQuality, performance,suggestion,fullName } = req.body;
        const totalRating = (design + functionality + responsiveness + contentQuality + performance) / 5;
    
        // Create a new rating document in the database
        const newRating = new Rating({ ...req.body, totalRating,fullName });
        await newRating.save();
    
        // Respond with success
        return res.status(201).send({ message: 'Rating added successfully', totalRating,fullName });
      } catch (err) {
        console.error(err);
       return res.status(500).send({ error: 'Internal Server Error' });
      }

});

//display all the feedback and rating 
router.post("/ratings/all",async(req,res)=>{
  const paginationDetails= req.body;
    try {
        await paginationRatingValidationSchema.validateAsync(paginationDetails);
    } catch (error) {
        return res.status(400).send({message:error.message});
    }
    //calculate skip
    const skip= (paginationDetails.page-1)*paginationDetails.limit;

    
    let match={}
    //start find query
    const ratings= await Rating.aggregate([
        {
            $match:match,
        },
        {
            $sort:{
                createdAt:-1,
            },
        },
        {
            $skip:skip,
        },
        {
            $limit:paginationDetails.limit,
        },
        {
            $project:{
                fullName:1,
                profession:1,
                suggestion:1,
                totalRating:1,
            }
        }
    ]);
    // Fetch short names based on full names
    const ratingsWithShortNames = await Promise.all(
        ratings.map(async (rating) => {
        const shortName = await getShortName(rating.fullName);
        return { ...rating, shortName };
        })
    );

    return res.status(200).send({ratings: ratingsWithShortNames });
});


//get latest rating and suggestion
router.get("/latest/review",async(req,res)=>{
  const rating= await Rating.aggregate([
      {
          $match:{}
      },
      {
          $sort:{createdAt:-1},
      },
      {
          $limit:6,
      },
      {
          $project:{
            fullName:1,
            profession:1,
            suggestion:1,
            totalRating:1,
          },
      }
  ])
  return res.status(200).send(rating);
})



export default router;