const authRouter = require("./auth.route.js");
const chatRouter = require("./chat.route.js");
const messageRouter = require("./message.route.js");
const userRouter = require("./user.route.js");

function route(app) {
  app.use("/auth", authRouter);
  app.use("/chat", chatRouter);
  app.use("/user", userRouter);
  app.use("/message", messageRouter);
}

module.exports = route;
