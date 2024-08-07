const Chat = require("../models/chat.model.js");
const Message = require("../models/message.model.js");

class chatController {
  // [GET] /chat/:id
  async getById(req, res, next) {
    const id = req.params.id;
    const chat = await Message.find({ chat_id: id }).populate({
      path: "sender_id",
      select: "-password -email -gender",
    });

    res.status(200).json(chat);
  }
  // [POST] /send
  async sendHandler(req, res, next) {
    try {
      const { sender_id, receiver_id, message, chat_id } = req.body;

      let chat = await Chat.findById(chat_id);
      if (!chat) {
        chat = new Chat({
          users: [sender_id, receiver_id],
        });
        await chat.save();
      }
      const newMesssage = new Message({
        chat_id: chat._id,
        sender_id,
        message,
      });
      await newMesssage.save();
      chat.latest_message = newMesssage._id;
      await chat.save();
      res.status(200).json({ newMesssage, chat });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new chatController();
