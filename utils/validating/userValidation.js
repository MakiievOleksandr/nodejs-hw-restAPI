const Joi = require('joi');

const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `"Name" is required field`,
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    'any.required': `"Email" is required field`,
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': `Enter password`,
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    'any.required': `"Email" is required field`,
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': `Enter password`,
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
