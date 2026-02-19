const express = require("express");
const router = express.Router();
const validateMiddleware = require("../middlewares/validate.middleware");
const { createTeacherSchema } = require("../validators/teachers.validator");
const checkUnique = require("../utils/checkUnique");
const teachersController = require("../controllers/teachers.controller");

// CREATE
router.post(
  "/",
  validateMiddleware(createTeacherSchema),
  checkUnique("teacher", ["userId", "registrationNumber", "email", "phone"]),
  teachersController.create,
);

// GET
router.get("/", teachersController.getAll);
router.get("/:id", teachersController.getOne);

// UPDATE
router.put("/:id", teachersController.update);

// DELETE
router.delete("/:id", teachersController.delete);

module.exports = router;
