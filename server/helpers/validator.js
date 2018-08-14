const Joi = require('joi');

module.exports = {
  userLogin: Joi.object({
    email: Joi.string().email(),
    password: Joi.string().required(),
  }),
  socialLogin: Joi.object({
    email: Joi.string().email(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    profilePhoto: Joi.string().required(),
    photos: Joi.array().required(),
    loc: Joi.object(),
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
    loc: Joi.object(),
  }),
  createEvent: Joi.object({
    title: Joi.string().required(),
    date: Joi.string().required(),
    location: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    details: Joi.string().required(),
    preference: Joi.string().required(),
    extra: Joi.string().required(),
    interestedIn: Joi.string().required(),
  }),
};
