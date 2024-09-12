const Chat = require("../models/chat.model.js");
const Message = require("../models/message.model.js");

class chatController {
  // [GET] /chat/:id
  async getById(req, res, next) {
    // id can be chat_id or user_id
    const id = req.params.id;
    const user_id = req.user._id;
    const prevChat = await Chat.findById(id)
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

    // If found, return the existing chat
    if (prevChat) {
      return res.status(200).json(prevChat);
    }

    // If not found, check for an existing chat between the two users
    const matchedChat = await Chat.findOne({
      users: { $all: [user_id, id] },
    })
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

    // If a matched chat is found, return it
    if (matchedChat) {
      return res.status(200).json(matchedChat);
    }

    // If no chat exists, create a new one
    const newChat = new Chat({ users: [user_id, id], messages: [] });
    await newChat.save();

    // Return the newly created chat
    const chatDetail = await Chat.findById(newChat._id).populate({
      path: "users",
      select: "-password -email -gender",
    });

    return res.status(201).json(chatDetail);
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
  // [POST] /chat/create
  async create(req, res, next) {
    try {
      const user_id = req.user._id;
      const recipient_ids = req.body.recipientIds; // Expecting an array of recipient IDs

      if (!Array.isArray(recipient_ids) || recipient_ids.length < 1) {
        return res
          .status(400)
          .json({ message: "At least one recipient ID is required" });
      }

      // Check if the chat already exists
      const chat = await Chat.findOne({
        users: { $all: [user_id, ...recipient_ids] },
        $expr: { $eq: [{ $size: "$users" }, recipient_ids.length + 1] }, // +1 for the current user
      });
      if (chat) {
        return res.status(409).json({ message: "Chat already exists" });
      }
      const newChat = new Chat({
        users: [user_id, ...recipient_ids],
        messages: [],
        group_admin: [user_id],
      });
      await newChat.save();
      const chatDetail = await Chat.findById(newChat._id).populate({
        path: "users",
        select: "-password -email -gender",
      });
      res.status(201).json(chatDetail);
    } catch (error) {
      console.error("Error in create chat: " + error);
      next(error);
    }
  }
}

module.exports = new chatController();
