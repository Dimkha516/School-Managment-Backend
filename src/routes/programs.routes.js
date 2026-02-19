const express = require("express");
const router = express.Router();
const programsController = require("../controllers/programs.controller");
const validateMiddleware = require("../middlewares/validate.middleware");
const checkUnique = require("../utils/checkUnique");
const {
  createProgramSchema,
  updateProgramSchema,
} = require("../validators/programs.validator");


// CREATE
router.post(
  "/",
  validateMiddleware(createProgramSchema),
  checkUnique("program", ["code"]),
  programsController.create,
);

// READ
router.get("/", programsController.getAll);
router.get("/:id", programsController.getOne);

// UPDATE:
router.put(
  "/:id",
  validateMiddleware(updateProgramSchema),
  programsController.update,
);

// DELETE:
router.delete("/:id", programsController.delete);

module.exports = router;
