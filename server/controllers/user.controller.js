const User = require("../models/users.model.js");

class chatController {
  // [GET] /chat/all
  async getAll(req, res, next) {
    try {
      const user_id = req.user._id;
      const users = await User.find({ _id: { $ne: user_id } }).select(
        " _id full_name avatar"
      );
      res.json(users);
    } catch (error) {
      console.error("Error in get all user: " + error);
    }
  }
}

module.exports = new chatController();
