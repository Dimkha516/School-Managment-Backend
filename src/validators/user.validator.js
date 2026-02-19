const Joi = require("joi");

const baseSchema = {
  email: Joi.string()
    .email()
    .max(255)
    .required()
    .messages({
    "string.email": "Email must be a valid email address",
    "string.max": "Email must not exceed 255 characters",
    "any.required": "Email is required",
    }), 

  passwordHash: Joi.string().min(6).max(255).required().messages({
    "string.min": "Password must be at least 6 characters",
    "string.max": "Password must not exceed 255 characters",
    "any.required": "Password is required",
  }),

  role: Joi.string().valid("admin", "teacher", "student").required().messages({
    "any.only": "Role must be admin, teacher or student",
    "any.required": "Role is required",
  }),

  isActive: Joi.boolean().messages({
    "boolean.base": "isActive must be true or false", 
  }),

  lastLogin: Joi.date().messages({ 
    "date.base": "lastLogin must be a valid date",
  })

};


const createUserSchema = Joi.object(baseSchema);

const updateUserSchema = Joi.object(
  Object.fromEntries(
    Object.entries(baseSchema).map(([key, value]) => [key, value.optional()]),
  ),
);

module.exports = { createUserSchema, updateUserSchema };
   