const Joi = require("joi");

const baseSchema = {
  name: Joi.string().max(200).required().messages({
    "string.max": "Program name must not exceed 200 chraracters",
    "any.required": "Program name is required",
  }),

  code: Joi.string().max(20).required().messages({
    "string.max": "Program code must not exceed 20 chracters",
    "any.required": "Program code is required",
  }),

  description: Joi.string().messages({
    "string.base": "Description must be a string",
  }),

  duration: Joi.string().max(50).messages({
    "string.max": "Duration must not exceed 50 characters",
  }),

  level: Joi.string().max(50).messages({
    "string.max": "Level must not exceed 50 characters",
  }),

  status: Joi.string().valid("active", "inactive", "archived").messages({
    "any.only": "Status must be active, inactive or archived",
  }),
};

const createProgramSchema = Joi.object(baseSchema);
const updateProgramSchema = Joi.object(
  Object.fromEntries(Object.entries(baseSchema).map(([k, v]) => [k, v.optional()]))
);

module.exports = {createProgramSchema, updateProgramSchema}
