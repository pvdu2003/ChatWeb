const express = require("express");
const passport = require("passport");
const router = express.Router();
require("dotenv").config();

const authController = require("../controllers/auth.controller.js");
const generateToken = require("../utils/generateToken.js");
router.post("/login", authController.login);
router.post("/signup", authController.signup);
// auth with google+
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    const token = generateToken(req.user);
    res.setHeader("Authorization", `Bearer ${token}`);
    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.redirect(`${process.env.CLIENT_URL}/chat`);
  }
);
router.post("/logout", authController.logout);
module.exports = router;
