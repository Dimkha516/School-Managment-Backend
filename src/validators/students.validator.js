const Joi = require("joi");

const baseSchema = {
  userId: Joi.number().integer().messages({
    "number.base": "userId must be a number",
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

  email: Joi.string().email().max(255).required().messages({
    "string.email": "Email must be valid",
    "any.required": "Email is required",
  }),

  phone: Joi.string().max(20).messages({
    "string.max": "Phone must not exceed 20 characters",
  }),

  birthDate: Joi.date().messages({
    "date.base": "Birth date must be valid",
  }),

  gender: Joi.string().valid("M", "F").required().messages({
    "any.only": "Gender must be M or F",
    "any.required": "Gender is required",
  }),

  address: Joi.string(),

  photoUrl: Joi.string().uri().max(500).messages({
    "string.uri": "Photo URL must be a valid URL",
  }),

  programId: Joi.number().integer().messages({
    "number.base": "Program ID must be a number",
  }),

  level: Joi.string().max(50),

  status: Joi.string()
    .valid("active", "inactive", "suspended", "graduated")
    .messages({
      "any.only": "Invalid student status",
    }),

  enrollmentDate: Joi.date().required().messages({
    "any.required": "Enrollment date is required",
  }),

  academicYear: Joi.string().max(20),
};

const createStudentSchema = Joi.object(baseSchema);
const updateStudentSchema = Joi.object(
  Object.fromEntries(
    Object.entries(baseSchema).map(([k, v]) => [k, v.optional()]),
  ),
);

module.exports = { createStudentSchema, updateStudentSchema };
