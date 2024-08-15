const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

authMiddleware = async (req, res, next) => {
  try {
    // const token = req.cookies.token;
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
    const user = await User.findById(decoded.user_id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in auth middleware " + error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
module.exports = authMiddleware;
