const Joi = require("joi");

const baseSchema = {
  studentId: Joi.number().integer().required().messages({
    "any.required": "Student ID is required",
    "number.base": "Student ID must be a number"
  }),

  courseId: Joi.number().integer().required().messages({
    "any.required": "Course ID is required",
    "number.base": "Course ID must be a number"
  }),

  date: Joi.date().required().messages({
    "any.required": "Attendance date is required",
    "date.base": "Date must be a valid date"
  }),

  status: Joi.string()
    .valid("present", "absent", "late", "excused")
    .messages({
      "any.only": "Status must be present, absent, late or excused"
    }),

  note: Joi.string().messages({
    "string.base": "Note must be a string"
  }),

  arrivalTime: Joi.date().messages({
    "date.base": "Arrival time must be a valid time"
  })
};

const createAttendanceSchema = Joi.object(baseSchema);

const updateAttendanceSchema = Joi.object(
  Object.fromEntries(
    Object.entries(baseSchema).map(([k, v]) => [k, v.optional()])
  )
);

module.exports = {
  createAttendanceSchema,
  updateAttendanceSchema
};
