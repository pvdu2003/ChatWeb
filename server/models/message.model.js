const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const messageSchema = new Schema(
  {
    _id: { type: objectId, auto: true },
    sender_id: { type: objectId, ref: "users" },
    message: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Message = mongoose.model("message", messageSchema);
module.exports = Message;
