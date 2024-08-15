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
    res.status(200).json(chat);
  }
  // [GET] /chat/all
  async getAll(req, res, next) {
    try {
      const user_id = req.user._id;
      const chats = await Chat.find({ users: { $in: [user_id] } })
        .sort({ updatedAt: -1 })
        .populate({
          path: "users",
          select: "-password",
        })
        .populate({
          path: "messages",
          options: { sort: { createdAt: -1 } }, // Get the last message
        });
      const formattedChats = chats.map((chat) => {
        const lastMessage = chat.messages[0];

        return {
          chatId: chat._id,
          users: chat.users,
          lastMessage: lastMessage ? lastMessage.message : null,
        };
      });
      res.status(200).json(formattedChats);
    } catch (error) {
      console.error("Error in get all chat: " + error);
    }
  }
}

module.exports = new chatController();
