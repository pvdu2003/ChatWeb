const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

router.get("/all", authMiddleware, userController.getAll);

module.exports = router;
