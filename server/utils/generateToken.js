const jwt = require("jsonwebtoken");
require("dotenv").config();
function gererateToken(user) {
  const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
}
module.exports = gererateToken;
