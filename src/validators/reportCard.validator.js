const Joi = require("joi");

const baseSchema = {
  studentId: Joi.number().integer().required().messages({
    "any.required": "Student ID is required",
  }),

  programId: Joi.number().integer().required().messages({
    "any.required": "Program ID is required",
  }),

  level: Joi.string().max(50).required().messages({
    "any.required": "Level is required",
  }),

  semester: Joi.number().integer().required().messages({
    "any.required": "Semester is required",
  }),

  academicYear: Joi.string().max(20).required().messages({
    "any.required": "Academic year is required",
  }),

  overallAverage: Joi.number().precision(2).min(0).messages({
    "number.base": "Overall average must be a number",
  }),

  totalCredits: Joi.number().integer().min(0),

  earnedCredits: Joi.number().integer().min(0),

  honors: Joi.string().max(50),

  rank: Joi.number().integer().min(1),

  status: Joi.string()
    .valid("passed", "failed", "repeat", "expelled")
    .messages({
      "any.only": "Invalid report card status",
    }),

  issueDate: Joi.date().messages({
    "date.base": "Issue date must be valid",
  }),

  gradesJson: Joi.alternatives().try(Joi.object(), Joi.array()).messages({
    "alternatives.match": "gradesJson must be a valid JSON object or array",
  }),
};

const createReportCardSchema = Joi.object(baseSchema);

const updateReportCardSchema = Joi.object(
  Object.fromEntries(
    Object.entries(baseSchema).map(([k, v]) => [k, v.optional()]),
  ),
);

module.exports = {
  createReportCardSchema,
  updateReportCardSchema,
};
