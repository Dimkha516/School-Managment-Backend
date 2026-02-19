const express = require("express");
const validateMiddleware = require("../middlewares/validate.middleware");
const {
  createScheduleSchema,
  updateScheduleSchema,
} = require("../validators/schedules.validator");
const shedulesController = require("../controllers/schedules.controller");
const checkExistMultiple = require("../utils/checkExistMultiple");
const router = express.Router();

// CREATE
router.post(
  "/",
  validateMiddleware(createScheduleSchema),
  checkExistMultiple([
    { model: "course", field: "courseId", column: "id" },
    { model: "teacher", field: "teacherId", column: "id" },
    { model: "room", field: "roomId", column: "id" },
    { model: "program", field: "programId", column: "id" },
  ]),
  shedulesController.create,
);

// GET
router.get("/", shedulesController.getAll);
router.get("/:id", shedulesController.getOne);

// UPDATE
router.put(
  "/:id",
  validateMiddleware(updateScheduleSchema),
  shedulesController.update,
);

// DELETE
router.delete("/:id", shedulesController.delete);
module.exports = router;
