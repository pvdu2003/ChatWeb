const Chat = require("../models/chat.model.js");
const Message = require("../models/message.model.js");

class messageController {
  // [POST] /send
  async sendHandler(req, res, next) {
    try {
      const { message, id } = req.body;
      const sender_id = req.user._id;
      let chat = await Chat.findById(id);
      if (!chat) {
        chat = new Chat({
          users: [sender_id, id],
        });
        await chat.save();
      }
      const newMessage = new Message({
        chat_id: chat._id,
        sender_id,
        message,
      });
      chat.messages.push(newMessage._id);
      await Promise.all([newMessage.save(), chat.save()]);
      const getSender = await Message.findById(newMessage._id).populate({
        path: "sender_id",
        select: "-password -email -gender",
      });
      res.status(200).json({ getSender, chat });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new messageController();
