const express = require("express");
const attendancesController = require("../controllers/attendances.controller");
const validateMiddleware = require("../middlewares/validate.middleware");
const {
  createAttendanceSchema,
  updateAttendanceSchema,
} = require("../validators/attendance.validator");
const checkExistMultiple = require("../utils/checkExistMultiple");
const router = express.Router();

// CREATE
router.post(
  "/",
  validateMiddleware(createAttendanceSchema),
  checkExistMultiple([
    { model: "student", field: "studentId", column: "id" },
    { model: "course", field: "courseId", column: "id" },
  ]),
  attendancesController.create,
);

// GET
(router.get("/", attendancesController.getAll),
  router.get("/:id", attendancesController.getOne),
  // UPDATE
  router.put(
    "/:id",
    validateMiddleware(updateAttendanceSchema),
    attendancesController.update,
  ));

// DELETE
router.delete("/:id", attendancesController.delete);

module.exports = router;
