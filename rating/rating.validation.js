import Joi from "joi";

export const ratingValidationSchema = Joi.object({
  fullName: Joi.string().required().trim().min(2).max(55),
  profession: Joi.string().required().trim().min(2).max(55),
  design: Joi.number().required(),
  functionality: Joi.number().required(),
  responsiveness: Joi.number().required(),
  performance: Joi.number().required(),
  contentQuality: Joi.number().required(),
  suggestion: Joi.string().max(500).min(2),
});

export const paginationRatingValidationSchema = Joi.object({
  page: Joi.number().integer().min(1).required(),
  limit: Joi.number().integer().min(1),
}).options({ presence: 'optional' });
