const express = require("express");
const validateMiddleware = require("../middlewares/validate.middleware");
const {
  createReportCardSchema,
  updateReportCardSchema,
} = require("../validators/reportCard.validator");
const checkExist = require("../utils/checkExist");
const reportCardController = require("../controllers/reportCard.controller");
const router = express.Router();

// CREATE
router.post(
  "/",
  validateMiddleware(createReportCardSchema),
  checkExist([
    { model: "student", field: "studentId", column: "id" },
    { model: "program", field: "programId", column: "id" },
  ]),
  reportCardController.create,
);

// GET
router.get("/", reportCardController.getAll);
router.get("/:id", reportCardController.getOne);

// UPDATE
router.put(
  "/:id",
  validateMiddleware(updateReportCardSchema),
  reportCardController.update,
);

// DELETE
router.delete("/:id", reportCardController.delete);

module.exports = router;
