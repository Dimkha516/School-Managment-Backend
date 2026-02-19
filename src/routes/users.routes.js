const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const validateMiddleware = require("../middlewares/validate.middleware");
const { createUserSchema, updateUserSchema } = require("../validators/user.validator");
const checkUnique = require("../utils/checkUnique");

// CREATE
router.post(
  "/",
  validateMiddleware(createUserSchema),
  checkUnique("user", ["email"]),
  usersController.create,
);

// READ
router.get("/", usersController.getAll);
router.get("/:id", usersController.getOne);

// UPDATE
router.put(
    "/:id",
    validateMiddleware(updateUserSchema), 
    usersController.update);

// DELETE
router.delete("/:id", usersController.delete);

module.exports = router;
