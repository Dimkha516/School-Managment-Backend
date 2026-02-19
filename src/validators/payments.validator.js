const Joi = require("joi");

const baseSchema = {
  studentId: Joi.number().integer().required(),

  amount: Joi.number().precision(2).required().messages({
    "any.required": "Amount is required"
  }),

  paymentType: Joi.string().max(100).required(),

  paymentMethod: Joi.string()
    .valid("cash","mobile_money","transfer","check","card")
    .required(),

  reference: Joi.string().max(100).required(),

  installment: Joi.string().max(50),

  academicYear: Joi.string().max(20).required(),

  transactionDate: Joi.date().required(),

  dueDate: Joi.date(),

  status: Joi.string()
    .valid("pending","approved","rejected","refunded"),

  note: Joi.string(),

  receiptUrl: Joi.string().uri().max(500)
};

const createPaymentSchema = Joi.object(baseSchema);
const updatePaymentSchema = Joi.object(
  Object.fromEntries(Object.entries(baseSchema).map(([k, v]) => [k, v.optional()]))
);

module.exports = { createPaymentSchema, updatePaymentSchema };
