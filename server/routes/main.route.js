const authRouter = require("./auth.route.js");
const chatRouter = require("./chat.route.js");
const messageRouter = require("./message.route.js");

function route(app) {
  app.use("/auth", authRouter);
  app.use("/chat", chatRouter);
  app.use("/message", messageRouter);
}

module.exports = route;
