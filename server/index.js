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
// const corsOptions = {
//   origin: process.env.BASE_URL,
//   credentials: true,
//   optionsSuccessStatus: 200,
// };
// Connect to MongoDB
db.connect();
const app = express();
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
app.use(cors());
route(app);
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
