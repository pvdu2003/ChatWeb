const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const chatSchema = new Schema(
  {
    _id: { type: objectId, auto: true },
    name: {
      type: String,
    },
    users: [
      {
        type: objectId,
        ref: "users",
      },
    ],
    messages: [
      {
        type: objectId,
        ref: "message",
      },
    ],
    group_admin: [
      {
        type: objectId,
        ref: "users",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Chat = mongoose.model("chat", chatSchema);
module.exports = Chat;
