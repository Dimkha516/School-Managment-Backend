const Joi = require("joi");

const baseSchema = {
  roomNumber: Joi.string().max(20).required().messages({
    "any.required": "Room number is required"
  }),

  name: Joi.string().max(200),

  type: Joi.string()
    .valid("Classroom", "Laboratory", "Auditorium", "MeetingRoom")
    .messages({
      "any.only": "Invalid room type"
    }),

  capacity: Joi.number().integer().min(0),

  equipment: Joi.object(),

  building: Joi.string().max(50),
  floor: Joi.number().integer(),

  status: Joi.string()
    .valid("available", "occupied", "maintenance", "out_of_service")
    .messages({
      "any.only": "Invalid room status"
    })
};

const createRoomSchema = Joi.object(baseSchema);
const updateRoomSchema = Joi.object(
  Object.fromEntries(Object.entries(baseSchema).map(([k, v]) => [k, v.optional()]))
);

module.exports = { createRoomSchema, updateRoomSchema };
