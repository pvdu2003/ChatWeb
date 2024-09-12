const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chat.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

router.get("/all", authMiddleware, chatController.getAll);
router.get("/:id", authMiddleware, chatController.getById);
router.post("/create", authMiddleware, chatController.create);

module.exports = router;
