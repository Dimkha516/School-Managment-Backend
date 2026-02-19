const express = require("express");
const validateMiddleware = require("../middlewares/validate.middleware");
const {
  createRoomSchema,
  updateRoomSchema,
} = require("../validators/rooms.validator");
const checkUnique = require("../utils/checkUnique");
const roomsController = require("../controllers/rooms.controller");
const router = express.Router();

// CREATE

router.post(
  "/",
  validateMiddleware(createRoomSchema),
  checkUnique("room", ["roomNumber"]),
  roomsController.create,
);

// GET
router.get("/", roomsController.getAll);
router.get("/:id", roomsController.getOne);

// UPDATE
router.put(
  "/:id",
  validateMiddleware(updateRoomSchema),
  roomsController.update,
);

// DELETE
router.delete("/:id", roomsController.delete);

module.exports = router;
