const prisma = require("../prisma");
const { success, error } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const crudController = (model) => {
  return {
    create: asyncHandler(async (req, res) => {
      const record = await prisma[model].create({
        data: req.body,
      });
      success(res, 201, `${model} created successfully`, record);
    }),

    getAll: asyncHandler(async (req, res) => {
      const records = await prisma[model].findMany();

      success(res, 200, `${model} list`, records);
    }),

    getOne: asyncHandler(async (req, res) => {
      const id = Number(req.params.id);

      const record = await prisma[model].findUnique({
        where: { id },
      });

      if (!record) {
        return error(res, 404, `${model} not found`);
      }

      return success(res, 200, `${model} retrieved successfully`, record);
    }),

    update: asyncHandler(async (req, res) => {
      const id = Number(req.params.id);

      const record = await prisma[model].update({
        where: { id },
        data: req.body,
      });

      return success(res, 200, `${model} updated successfully`, record);
    }),

    delete: asyncHandler(async (req, res) => {
      const id = Number(req.params.id);

      await prisma[model].delete({
        where: { id },
      });

      return success(res, 200, `${model} deleted successfully`);
    }),
  };
};

module.exports = crudController;
