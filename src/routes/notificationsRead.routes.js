const express = require("express");
const validateMiddleware = require("../middlewares/validate.middleware");
const {
  createNotificationReadSchema,
  updateNotificationReadSchema,
} = require("../validators/notificationRead.validator");
const notificationReadController = require("../controllers/notificationRead.controller");
const checkExistMultiple = require("../utils/checkExistMultiple");
const router = express.Router();

// CREATE
router.post(
  "/",
  validateMiddleware(createNotificationReadSchema),
  checkExistMultiple([
    {
      model: "notification",
      field: "notificationId",
      column: "id",
    },
    {
      model: "user",
      field: "userId",
      column: "id",
    },
  ]),
  notificationReadController.create,
);

// GET
router.get("/", notificationReadController.getAll);
router.get("/:id", notificationReadController.getOne);

// UPDATE
router.put(
  "/:id",
  validateMiddleware(updateNotificationReadSchema),
  notificationReadController.update,
);
// DELETE
router.delete("/:id", notificationReadController.delete);

module.exports = router;
