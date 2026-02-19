const express = require("express");
const checkExist = require("../utils/checkExist");
const validateMiddleware = require("../middlewares/validate.middleware");
const {
  createNotificationSchema,
  updateNotificationSchema,
} = require("../validators/notifications.validator");
const notificationController = require("../controllers/notification.controller");
const checkExistMultiple = require("../utils/checkExistMultiple");
const router = express.Router();

// CREATE
router.post(
  "/",
  validateMiddleware(createNotificationSchema),
  checkExistMultiple([
    {
      model: "program",
      field: "programId",
      column: "id",
    },
    {
      model: "user",
      field: "authorId",
      column: "id",
    },
  ]),
  notificationController.create,
);
// GET
router.get("/", notificationController.getAll);
router.get("/:id", notificationController.getOne);

// UPDATE
router.put(
  "/:id",
  validateMiddleware(updateNotificationSchema),
  notificationController.update,
);

// DELETE:
router.delete("/:id", notificationController.delete);

module.exports = router;
