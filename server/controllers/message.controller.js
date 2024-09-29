const Chat = require("../models/chat.model.js");
const Message = require("../models/message.model.js");

class messageController {
  // [POST] /message/send
  async sendHandler(req, res, next) {
    try {
      const { message, id } = req.body;
      const sender_id = req.user._id;
      let chat = await Chat.findById(id);
      if (!chat) {
        chat = await Chat.findOne({
          users: { $all: [sender_id, id] },
          $expr: { $eq: [{ $size: "$users" }, 2] },
        });
        if (!chat) {
          chat = new Chat({
            users: [sender_id, id],
          });
          await chat.save();
        }
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
  // [DELETE] /message/:id
  async deleteHandler(req, res, next) {
    try {
      const { id } = req.params;
      await Message.deleteOne({ _id: id });
      res.status(200).json({ message: "Message deleted successfully" });
    } catch (err) {
      console.log(err);
    }
  }
  // [PATCH] /message/:id
  async updateHandler(req, res, next) {
    try {
      const { id } = req.params;
      const { message } = req.body;
      await Message.findByIdAndUpdate(id, { message }, { new: true });
      res.status(200).json({ message: "Message updated successfully" });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new messageController();
