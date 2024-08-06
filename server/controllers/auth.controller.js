const bcrypt = require("bcrypt");
const User = require("../models/users.model.js");
const generateToken = require("../utils/generateToken.js");

class authController {
  // [POST] /auth/login
  async login(req, res, next) {
    const { username, password } = req.body;
    let err = {};
    if (!username || !password) {
      err.message = "Please provide both username and password";
      return res.status(400).json(err);
    }
    const user = await User.findOne({ username });
    if (!user) {
      err.message = "Invalid username";
      return res.status(401).json(err);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      err.message = "Invalid password";
      return res.status(401).json(err);
    }
    const token = generateToken(user);
    res.setHeader("Authorization", `Bearer ${token}`);
    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(200).json(token);
  }

  // [POST] /auth/signup
  async signup(req, res, next) {
    try {
      const { username, password, confirm_password, full_name, email, gender } =
        req.body;
      let err = {};
      if (
        !username ||
        !password ||
        !confirm_password ||
        !full_name ||
        !email ||
        !gender
      ) {
        err.message = "Please fill all fields";
        return res.status(400).json(err);
      }
      if (password !== confirm_password) {
        err.message = "Passwords do not match";
        return res.status(400).json(err);
      }
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        err.message = "Username already exists";
        return res.status(400).json(err);
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

      const newUser = new User({
        username,
        password: hashedPassword,
        full_name,
        email,
        gender,
        avatar: gender === "male" ? boyProfilePic : girlProfilePic,
      });
      await newUser.save();
      res.json(newUser);
    } catch (err) {
      console.error("Error in signup handler", err);
      res.status(500).json(err);
    }
  }
  // [POST] /auth/logout
  async logout(req, res, next) {
    try {
      res.clearCookie("token");
      res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new authController();
