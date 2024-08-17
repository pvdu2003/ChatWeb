"use strict";
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();
require("./config/passport.js");
const route = require("./routes/main.route");

const db = require("./config/db");
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
// Connect to MongoDB
db.connect();
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: process.env.CLIENT_URL },
});

app.use(
  session({
    maxAge: 60 * 60 * 1000,
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
route(app);
server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
const userSocketMap = {};
io.on("connection", (socket) => {
  console.log("New user connected" + socket.id);
  const userId = socket.handshake.query.userId;
  if (userId !== "undefined") userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected" + socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
