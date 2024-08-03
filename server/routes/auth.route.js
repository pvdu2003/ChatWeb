const express = require("express");
const passport = require("passport");
const router = express.Router();
require("dotenv").config();

const authController = require("../controllers/auth.controller.js");
const generateToken = require("../utils/generateToken.js");
router.post("/login", authController.login);
router.post("/signup", authController.signup);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  }),
  (req, res) => {
    const token = generateToken(req.user);
    console.log(req.user, token);
    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(200).json({ user: req.user });
    //   res.redirect("/");
  }
);
// auth with google+
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
module.exports = router;
