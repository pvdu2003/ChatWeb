const authRouter = require("./auth.route.js");

function route(app) {
  app.use("/auth", authRouter);
}

module.exports = route;
