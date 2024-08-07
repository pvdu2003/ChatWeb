const authRouter = require("./auth.route.js");
const chatRouter = require("./chat.route.js");

function route(app) {
  app.use("/auth", authRouter);
  app.use("/chat", chatRouter);
}

module.exports = route;
