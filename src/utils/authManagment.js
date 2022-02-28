const { verifyToken } = require("./tokenManagment");

const checkAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer")) {
    try {
      const token = auth.slice(7);
      const decodedToken = verifyToken(token);
      req.user = decodedToken.user;
      next();
    } catch (e) {
      res.status(400).json({ error: "Invalid or expired token" });
    }
  } else res.status(400).json({ error: "Token must be provided" });
};

module.exports = checkAuth;
