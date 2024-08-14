const Chat = require("../models/chat.model.js");
const Message = require("../models/message.model.js");

class messageController {
  // [POST] /send
  async sendHandler(req, res, next) {
    try {
      const { receiver_id, message, chat_id } = req.body;
      const sender_id = req.user._id;
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
      chat.messages.push(newMesssage._id);
      await Promise.all([newMesssage.save(), chat.save()]);
      res.status(200).json({ newMesssage, chat });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new messageController();
