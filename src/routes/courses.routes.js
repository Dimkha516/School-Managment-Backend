const express = require("express");
const router = express.Router();
const { createCourseSchema } = require("../validators/courses.validator");
const validateMiddleware = require("../middlewares/validate.middleware");
const checkUnique = require("../utils/checkUnique");
const checkExist = require("../utils/checkExist");
const coursesController = require("../controllers/courses.controller");
const checkExistMultiple = require("../utils/checkExistMultiple");

// CREATE
router.post(
  "/",
  validateMiddleware(createCourseSchema),
  checkUnique("course", ["code"]),
  checkExistMultiple([
    {
      model: "program",
      field: "programId",
      column: "id",
    },
    {
      model: "teacher",
      field: "teacherId",
      column: "id",
    },
  ]),
  coursesController.create,
);

// GET
router.get("/", coursesController.getAll);
router.get("/:id", coursesController.getOne);

// UPDATE
router.put("/:id", coursesController.update);

// DELETE
router.delete("/:id", coursesController.delete);

module.exports = router;
