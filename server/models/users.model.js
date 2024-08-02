const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema(
  {
    _id: { type: objectId, auto: true },
    username: { type: String, required: true, unique: true },
    full_name: { type: String, required: true },
    password: { type: String, minLength: 6 },
    phone_num: { type: String },
    email: { type: String, required: true },
    dob: { type: Date },
    gender: { type: String, required: true, enum: ["male", "female"] },
    avatar: {
      type: String,
      default: "",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);
module.exports = User;
