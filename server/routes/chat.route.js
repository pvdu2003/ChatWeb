const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chat.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

router.get("/:id", authMiddleware, chatController.getById);

module.exports = router;
