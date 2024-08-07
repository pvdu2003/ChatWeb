const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chat.controller.js");

router.post("/send", chatController.sendHandler);
router.get("/:id", chatController.getById);
module.exports = router;
