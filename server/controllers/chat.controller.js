const Chat = require("../models/chat.model.js");
const Message = require("../models/message.model.js");

class chatController {
  // [GET] /chat/:id
  async getById(req, res, next) {
    const chat_id = req.params.id;
    const user_id = req.user._id;
    const isParticipant = await Chat.findOne({
      _id: chat_id,
      users: { $in: [user_id] },
    });
    if (!isParticipant) {
      return res.status(403).json({
        message: "You are not in this chat or this chat is not exist!",
      });
    }
    const chat = await Chat.findById(chat_id)
      .populate({
        path: "users",
        select: "-password -email -gender",
      })
      .populate({
        path: "messages",
        populate: {
          path: "sender_id",
          select: "-password -email -gender",
        },
        options: { sort: { createdAt: 1 } },
      });
    console.log(chat);

    res.status(200).json(chat);
  }
}

module.exports = new chatController();
