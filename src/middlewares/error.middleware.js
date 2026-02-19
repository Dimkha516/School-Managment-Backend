const { error } = require("../utils/apiResponse");

module.exports.errorMiddleware = (err, req, res, next) => {
  console.error(err);

  // Prisma unique constraint
  if (err.code === "P2002") {
    return error(res, 409, "Unique constraint violation");
  }

  // Prisma record not found
  if (err.code === "P2025") {
    return error(res, 404, "Record not found");
  }

  return error(res, 500, "Internal server error");
};
