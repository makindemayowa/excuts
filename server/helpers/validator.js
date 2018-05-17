const Joi = require('joi');

module.exports = {
  userLogin: Joi.object({
    email: Joi.string().email(),
    password: Joi.string().required(),
  }),
  createUser: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
    address: Joi.string(),
    height: Joi.number(),
    weight: Joi.number(),
    age: Joi.number(),
    photos: Joi.string(),
    info: Joi.string(),
    interests: Joi.string(),
    phone_no: Joi.number(),
    status: Joi.string(),
  }),
};
