const Joi = require("joi");

const baseSchema = {
  userId: Joi.number().integer().messages({
    "number.base": "User ID must be a number",
  }),

  registrationNumber: Joi.string().max(50).required().messages({
    "string.max": "Registration number must not exceed 50 characters",
    "any.required": "Registration number is required",
  }),

  lastName: Joi.string().max(100).required().messages({
    "string.max": "Last name must not exceed 100 characters",
    "any.required": "Last name is required",
  }),

  firstName: Joi.string().max(100).required().messages({
    "string.max": "First name must not exceed 100 characters",
    "any.required": "First name is required",
  }),

  title: Joi.string().max(50).messages({
    "string.max": "Title must not exceed 50 characters",
  }),

  email: Joi.string().email().max(255).required().messages({
    "string.email": "Email must be valid",
    "any.required": "Email is required",
  }),

  phone: Joi.string().max(20),

  photoUrl: Joi.string().uri().max(500).messages({
    "string.uri": "Photo URL must be valid",
  }),

  specialty: Joi.string().max(200),
  degree: Joi.string().max(200),

  hireDate: Joi.date().required().messages({
    "any.required": "Hire date is required",
  }),

  status: Joi.string().valid("permanent", "contract", "temporary").messages({
    "any.only": "Status must be permanent, contract or temporary",
  }),
};

const createTeacherSchema = Joi.object(baseSchema);
const updateTeacherSchema = Joi.object(
  Object.fromEntries(
    Object.entries(baseSchema).map(([k, v]) => [k, v.optional()]),
  ),
);

module.exports = { createTeacherSchema, updateTeacherSchema };
