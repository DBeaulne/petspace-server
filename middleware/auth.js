const jwt = require("jsonwebtoken");

const getToken = (req) => {
  const header = req.headers.authorization || "";
  if (header.startsWith("Bearer ")) {
    return header.slice(7);
  }
  return null;
};

const requireAuth = (req, res, next) => {
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

const requireRole = (role) => (req, res, next) => {
  const roles = Array.isArray(req.user?.roles) ? req.user.roles : [];

  if (!roles.includes(role)) {
    return res.status(403).json({ message: "Insufficient permissions" });
  }

  next();
};

module.exports = { requireAuth, requireRole };
