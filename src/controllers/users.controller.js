const prisma = require("../prisma");

module.exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany();
    return res.status(200).json({
      success: true,
      message: "Users Get successfully",
      data: allUsers,
    });
  } catch (error) {
    console.log("Error to get users");
    return res.status(500).json({
      success: true,
      message: "Unable to fetch Users",
      error: error.message,
    });
  }
};
