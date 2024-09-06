const express = require("express");
const passport = require("passport");
const router = express.Router();
require("dotenv").config();

const authController = require("../controllers/auth.controller.js");
const generateToken = require("../utils/generateToken.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.post("/forgot-password", authController.forgotPwd);
router.post("/change-password", authMiddleware, authController.changePwd);
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
    res.redirect(`${process.env.CLIENT_URL}`);
  }
);
router.get("/google/success", async (req, res) => {
  return res.status(200).json({
    token: req.cookies.token,
    user: req.user,
  });
});
router.post("/logout", authController.logout);
module.exports = router;
