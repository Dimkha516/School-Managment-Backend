// Login
module.exports.login = (req, res) => {
  res.status(200).json({
    message: "Login Test",
  });
};

// Logout
module.exports.logout = (req, res) => {
    res.status(200).json({
        "message": "Logout Test"
    })
}
