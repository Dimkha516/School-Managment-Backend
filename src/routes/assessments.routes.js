const express = require("express");
const validateMiddleware = require("../middlewares/validate.middleware");
const {
  createAssessmentSchema,
  updateAssessmentSchema,
} = require("../validators/assessment.validator");
const checkExistMultiple = require("../utils/checkExistMultiple");
const assessmentsController = require("../controllers/assessments.controller");
const router = express.Router();

// CREATE
router.post(
  "/",
  validateMiddleware(createAssessmentSchema),
  checkExistMultiple([
    { model: "course", field: "courseId", column: "id" },
    { model: "program", field: "programId", column: "id" },
    { model: "room", field: "roomId", column: "id" },
  ]),
  assessmentsController.create,
);

// GET
router.get("/", assessmentsController.getAll);
router.get("/:id", assessmentsController.getOne);

// UPDATE
router.put(
  "/:id",
  validateMiddleware(updateAssessmentSchema),
  assessmentsController.update,
);

// DELETE
router.delete("/:id", assessmentsController.delete);

module.exports = router;
