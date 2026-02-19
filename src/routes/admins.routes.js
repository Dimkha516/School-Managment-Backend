const express = require("express");
const validateMiddleware = require("../middlewares/validate.middleware");
const {
  createAdminSchema,
  updateAdminSchema,
} = require("../validators/admins.validator");
const checkUnique = require("../utils/checkUnique");
const adminController = require("../controllers/admin.controller");
const checkExist = require("../utils/checkExist");
const router = express.Router();

// CREATE
router.post(
  "/",
  validateMiddleware(createAdminSchema),
  checkUnique("admin", ["phone"]),
  checkExist({ model: "user", field: "userId" }),
  adminController.create,
);
// GET
router.get("/", adminController.getAll);
router.get("/:id", adminController.getOne);

// UPDATE
router.put(
  "/:id",
  validateMiddleware(updateAdminSchema),
  adminController.update,
);

// DELETE
router.delete("/:id", adminController.delete);

module.exports = router;
