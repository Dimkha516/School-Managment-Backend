const Joi = require("joi");

const baseSchema = {
  courseId: Joi.number().integer().required(),
  teacherId: Joi.number().integer().required(),
  roomId: Joi.number().integer().required(),
  programId: Joi.number().integer().required(),

  dayOfWeek: Joi.string()
    .valid("Monday","Tuesday","Wednesday","Thursday","Friday","Saturday")
    .required()
    .messages({
      "any.only": "Invalid day of week"
    }),

  startTime: Joi.date().required().messages({
    "any.required": "Start time is required"
  }),

  endTime: Joi.date().required().messages({
    "any.required": "End time is required"
  }),

  type: Joi.string()
    .valid("lecture","practical","tutorial","exam"),

  semester: Joi.number().integer().required(),
  academicYear: Joi.string().max(20).required()
};

const createScheduleSchema = Joi.object(baseSchema);
const updateScheduleSchema = Joi.object(
  Object.fromEntries(Object.entries(baseSchema).map(([k, v]) => [k, v.optional()]))
);

module.exports = { createScheduleSchema, updateScheduleSchema };
