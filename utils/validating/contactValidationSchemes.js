const Joi = require('joi');

const addSchema = Joi.object({
    name: Joi.string().required().messages({
      'any.required': `missing required "name" field`,
    }),   
    email: Joi.string().required().messages({
      'any.required': `missing required "email" field`,
    }),
    phone: Joi.string().required().messages({
      'any.required': `missing required "phone" field`,
    }),
    favorite: Joi.boolean()
  });
  const updateSchema = Joi.object({
    name: Joi.string().required().messages({
      'any.required': `missing "name" field`,
    }),   
    email: Joi.string().required().messages({
      'any.required': `missing "email" field`,
    }),
    phone: Joi.string().required().messages({
      'any.required': `missing "phone" field`,
    })
  });
  const updateFavoriteSchema = Joi.object({
favorite: Joi.boolean().required().messages({
  "message": "missing field favorite"
})
  })

  module.exports ={
    addSchema,
    updateSchema,
    updateFavoriteSchema
  }