const express = require("express");
const validateMiddleware = require("../middlewares/validate.middleware");
const { createStudentSchema } = require("../validators/students.validator");
const checkUnique = require("../utils/checkUnique");
const studentsController = require("../controllers/students.controller");
const router = express.Router();

// CREATE
router.post(
  "/",
  validateMiddleware(createStudentSchema),
  checkUnique("student", ["userId", "registrationNumber", "email", "phone"]),
  studentsController.create,
);

// GET
router.get("/", studentsController.getAll);
router.get("/:id", studentsController.getOne);

// UPDATE
router.put("/:id", studentsController.update);

// DELETE
router.delete("/:id", studentsController.delete);

module.exports = router;
