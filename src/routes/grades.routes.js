const express = require("express");
const validateMiddleware = require("../middlewares/validate.middleware");
const {
  createGradeSchema,
  updateGradeSchema,
} = require("../validators/grade.validator");
const checkExistMultiple = require("../utils/checkExistMultiple");
const gradesController = require("../controllers/grades.controller");
const router = express.Router();

// CREATE
router.post(
  "/",
  validateMiddleware(createGradeSchema),
  checkExistMultiple([
    { model: "student", field: "studentId", column: "id" },
    { model: "assessment", field: "assessmentId", column: "id" },
    { model: "course", field: "courseId", column: "id" },
  ]),
  gradesController.create,
);

// GET
router.get("/", gradesController.getAll);
router.get("/:id", gradesController.getOne);

// UPDATE
router.put(
  "/:id",
  validateMiddleware(updateGradeSchema),
  gradesController.update,
);

// DELETE
router.delete("/:id", gradesController.delete);

module.exports = router;
