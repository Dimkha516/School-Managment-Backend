const Joi = require("joi");

const baseSchema = {
  name: Joi.string().max(200).required().messages({
    "any.required": "Course name is required"
  }),

  code: Joi.string().max(20).required().messages({
    "any.required": "Course code is required"
  }),

  description: Joi.string(),

  programId: Joi.number().integer().required().messages({
    "any.required": "Program ID is required"
  }),

  teacherId: Joi.number().integer(),

  credits: Joi.number().integer().min(0).messages({
    "number.min": "Credits must be positive"
  }),

  hours: Joi.number().integer().min(0),

  semester: Joi.number().integer(),

  status: Joi.string()
    .valid("planned", "in_progress", "completed", "cancelled")
    .messages({
      "any.only": "Invalid course status"
    })
};

const createCourseSchema = Joi.object(baseSchema);
const updateCourseSchema = Joi.object(
  Object.fromEntries(Object.entries(baseSchema).map(([k, v]) => [k, v.optional()]))
);

module.exports = { createCourseSchema, updateCourseSchema };
