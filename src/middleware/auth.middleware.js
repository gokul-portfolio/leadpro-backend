const jwt = require("jsonwebtoken");


// ==========================
// PROTECT MIDDLEWARE
// ==========================
const protect = async (req, res, next) => {

  try {

    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer")
    ) {

      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // token extract
    const token = authHeader.split(" ")[1];

    // verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // set user
    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};


// ==========================
// ADMIN ONLY
// ==========================
const adminOnly = (req, res, next) => {

  if (req.user.role !== "admin") {

    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }

  next();
};


module.exports = {
  protect,
  adminOnly,
};