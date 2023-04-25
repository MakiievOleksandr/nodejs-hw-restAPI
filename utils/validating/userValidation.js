const Joi = require('joi');

const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
const subscript = ['starter', 'pro', 'business'];

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    'any.required': `"Email" is required field`,
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': `Enter password`,
  }),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    'any.required': `"Email" is required field`,
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

const subscribeSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscript)
    .required()
    .messages({
      'any.required': `"Subscription" is required field`,
    }),
});

module.exports = {
  registerSchema,
  verifyEmailSchema,
  loginSchema,
  subscribeSchema,
};
