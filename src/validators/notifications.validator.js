const Joi = require("joi");

const baseSchema = {
  title: Joi.string().max(200).required(),
  message: Joi.string().required(),

  type: Joi.string()
    .valid("info","exam","course","payment","meeting","urgent"),

  priority: Joi.string()
    .valid("low","medium","high"),

  recipients: Joi.alternatives().try(
    Joi.array().items(Joi.number().integer()),
    Joi.object()
  ).required().messages({
    "any.required": "Recipients field is required"
  }),

  programId: Joi.number().integer(),
  level: Joi.string().max(50),

  expirationDate: Joi.date(),

  status: Joi.string()
    .valid("draft","sent","archived"),

  authorId: Joi.number().integer()
};

const createNotificationSchema = Joi.object(baseSchema);
const updateNotificationSchema = Joi.object(
  Object.fromEntries(Object.entries(baseSchema).map(([k, v]) => [k, v.optional()]))
);

module.exports = { createNotificationSchema, updateNotificationSchema };
