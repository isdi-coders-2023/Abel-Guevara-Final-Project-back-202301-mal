import { Joi } from 'express-validation';

const businessValidation = {
  body: Joi.object({
    categories: Joi.string(),
    nameBusiness: Joi.string(),
    address: Joi.string(),
    phone: Joi.string().length(9),
    profileUrl: Joi.string(),
    description: Joi.string(),
    reviews: Joi.array(),
    score: Joi.array(),
    creator: Joi.string(),
  }),
};

export default businessValidation;
