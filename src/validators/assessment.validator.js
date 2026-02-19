const Joi = require("joi");

const baseSchema = {
  title: Joi.string().max(200).required().messages({
    "any.required": "Assessment title is required",
    "string.max": "Title must not exceed 200 characters",
  }),

  courseId: Joi.number().integer().required().messages({
    "any.required": "Course ID is required",
  }),

  programId: Joi.number().integer().required().messages({
    "any.required": "Program ID is required",
  }),

  roomId: Joi.number().integer().messages({
    "number.base": "Room ID must be a number",
  }),

  type: Joi.string()
    .valid("exam", "assignment", "practical", "continuous_assessment", "oral")
    .required()
    .messages({
      "any.only": "Invalid assessment type",
      "any.required": "Assessment type is required",
    }),

  date: Joi.date().required().messages({
    "any.required": "Assessment date is required",
  }),

  startTime: Joi.date().required().messages({
    "any.required": "Start time is required",
  }),

  endTime: Joi.date().required().messages({
    "any.required": "End time is required",
  }),

  duration: Joi.number().integer().min(0).messages({
    "number.base": "Duration must be a number",
  }),

  totalPoints: Joi.number().precision(2).min(0).messages({
    "number.base": "Total points must be a number",
  }),

  coefficient: Joi.number().integer().min(1).messages({
    "number.base": "Coefficient must be a number",
    "number.min": "Coefficient must be at least 1",
  }),

  description: Joi.string(),

  status: Joi.string()
    .valid("planned", "in_progress", "completed", "cancelled")
    .messages({
      "any.only": "Invalid assessment status",
    }),
};

const createAssessmentSchema = Joi.object(baseSchema);

const updateAssessmentSchema = Joi.object(
  Object.fromEntries(
    Object.entries(baseSchema).map(([k, v]) => [k, v.optional()]),
  ),
);

module.exports = {
  createAssessmentSchema,
  updateAssessmentSchema,
};
