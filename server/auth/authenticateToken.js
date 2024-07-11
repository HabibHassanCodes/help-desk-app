const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (token === null) {
    return res.status(401).json({ error: "Token not found" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid Token" });
    }

    req.user = user;
    next();
  });
};

module.exports = {
  authenticateToken,
};