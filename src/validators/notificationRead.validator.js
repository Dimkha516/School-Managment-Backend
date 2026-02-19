const Joi = require("joi");

const baseSchema = {
  notificationId: Joi.number().integer().required().messages({
    "any.required": "Notification ID is required"
  }),

  userId: Joi.number().integer().required().messages({
    "any.required": "User ID is required"
  })
};

const createNotificationReadSchema = Joi.object(baseSchema);
const updateNotificationReadSchema = Joi.object(
  Object.fromEntries(Object.entries(baseSchema).map(([k, v]) => [k, v.optional()]))
);

module.exports = { createNotificationReadSchema, updateNotificationReadSchema };
