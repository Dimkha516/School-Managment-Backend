const express = require("express");
const validateMiddleware = require("../middlewares/validate.middleware");
const {
  createPaymentSchema,
  updatePaymentSchema,
} = require("../validators/payments.validator");
const checkUnique = require("../utils/checkUnique");
const checkExist = require("../utils/checkExist");
const paymentsController = require("../controllers/payments.controller");
const router = express.Router();

// CREATE:
router.post(
  "/",
  validateMiddleware(createPaymentSchema),
  checkUnique("payment", ["reference"]),
  checkExist({
    model: "student",
    field: "studentId",
    column: "id",
  }),
  paymentsController.create,
);

// GET:
router.get("/", paymentsController.getAll);
router.get("/:id", paymentsController.getOne);

// UPDATE:
router.put(
  "/:id",
  validateMiddleware(updatePaymentSchema),
  paymentsController.update,
);

// DELETE:
router.delete("/:id", paymentsController.delete);

module.exports = router;
