const mongoose = require("mongoose");
require("dotenv").config();
async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connect successfully!");
  } catch (error) {
    console.log("Fail to Connect!");
  }
}
module.exports = { connect };
