const jwt = require("jsonwebtoken");

const { SECRET } = process.env;

module.exports = {
  generateToken(user) {
    return jwt.sign({ user }, SECRET, { expiresIn: "7d" });
  },
  verifyToken(token) {
    return jwt.verify(token, SECRET);
  },
};
