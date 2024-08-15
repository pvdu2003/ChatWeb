const express = require("express");
const router = express.Router();

const messageController = require("../controllers/message.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

router.post("/send", authMiddleware, messageController.sendHandler);

module.exports = router;