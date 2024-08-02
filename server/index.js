"use strict";
const express = require("express");
const cookieParser = require("cookie-parser");
const route = require("./routes/main.route");
require("dotenv").config();

const db = require("./config/db");
const port = process.env.PORT || 3000;

// Connect to MongoDB
db.connect();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(cookieParser());

route(app);
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
