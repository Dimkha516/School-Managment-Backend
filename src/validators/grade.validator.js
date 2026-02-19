const Joi = require("joi");

const baseSchema = {
  studentId: Joi.number().integer().required().messages({
    "any.required": "Student ID is required"
  }),

  assessmentId: Joi.number().integer().required().messages({
    "any.required": "Assessment ID is required"
  }),

  courseId: Joi.number().integer().required().messages({
    "any.required": "Course ID is required"
  }),

  grade: Joi.number().precision(2).min(0).messages({
    "number.base": "Grade must be a number"
  }),

  maxPoints: Joi.number().precision(2).min(0).messages({
    "number.base": "Max points must be a number"
  }),

  coefficient: Joi.number().integer().min(1).messages({
    "number.base": "Coefficient must be a number"
  }),

  assessmentDate: Joi.date().required().messages({
    "any.required": "Assessment date is required"
  }),

  note: Joi.string()
};

const createGradeSchema = Joi.object(baseSchema);

const updateGradeSchema = Joi.object(
  Object.fromEntries(
    Object.entries(baseSchema).map(([k, v]) => [k, v.optional()])
  )
);

module.exports = {
  createGradeSchema,
  updateGradeSchema
};
