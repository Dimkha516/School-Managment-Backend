const Joi = require("joi");

const baseSchema = {
  userId: Joi.number().integer().required().messages({
    "any.required": "User ID is required",
    "number.base": "User ID must be a number"
  }),

  lastName: Joi.string().max(100).required().messages({
    "any.required": "Last name is required"
  }),

  firstName: Joi.string().max(100).required().messages({
    "any.required": "First name is required"
  }),

  phone: Joi.string().max(20),

  permissions: Joi.object().messages({
    "object.base": "Permissions must be a JSON object"
  })
};

const createAdminSchema = Joi.object(baseSchema);
const updateAdminSchema = Joi.object(
  Object.fromEntries(Object.entries(baseSchema).map(([k, v]) => [k, v.optional()]))
);

module.exports = { createAdminSchema, updateAdminSchema };
