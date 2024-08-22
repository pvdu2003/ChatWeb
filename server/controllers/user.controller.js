const User = require("../models/users.model.js");

class chatController {
  // [GET] /chat/all?user
  async getAll(req, res, next) {
    try {
      const user = req.query.user;
      const user_id = req.user._id;
      let users;
      if (user) {
        users = await User.find({
          _id: { $ne: user_id },
          $or: [
            { name: { $regex: user, $options: "i" } }, // Case-insensitive search by name
            { full_name: { $regex: user, $options: "i" } }, // Case-insensitive search by email
          ],
        }).select(" _id full_name username avatar");
      } else {
        users = await User.find({ _id: { $ne: user_id } }).select(
          " _id full_name username avatar"
        );
      }
      res.json(users);
    } catch (error) {
      console.error("Error in get all user: " + error);
    }
  }
}

module.exports = new chatController();
