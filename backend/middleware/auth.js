const jwt = require("jsonwebtoken");

exports.auth = (roles = []) => {
  return (req, res, next) => {
    let token = null;

    // 1) Check Authorization Header
    const authHeader = req.headers.authorization || "";
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // 2) Check Cookie (fallback)
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // 3) If no token found
    if (!token) {
      return res.status(401).json({ msg: "No token provided" });
    }

    try {
      // 4) Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // 5) Check roles if provided
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ msg: "Access denied" });
      }

      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ msg: "Token expired" });
      }
      return res.status(401).json({ msg: "Invalid token" });
    }
  };
};
