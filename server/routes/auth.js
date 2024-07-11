const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { hashPasswordMiddleware } = require("../auth/authentication");
const { authenticateToken } = require("../auth/authenticateToken");
const { User } = require("../models/index");
require("dotenv").config();

const router = express.Router();

// register
router.post(
  "/register/:role",
  hashPasswordMiddleware,
  async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const alreadyCreated =
        (await User.findOne({ where: { username } })) || null;

      if (alreadyCreated) {
        return res.status(409).json({ error: "Username already exists" });
      }

      const role = req.params.role;

      console.log(role);
      if (role === "admin" || role === "customer") {
        await User.create({ username, password, role });
      } else {
        return next("Incorrect Role");
      }

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).send({ error: "Internal Server Error; Router" });
    }
  }
);

//Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const { JWT_SECRET } = process.env;
  
  try {
    // Find the user in the array based on the provided credentials
    const user = await User.findOne({ where: { username } });
    console.log(user)
    if (!user) {
      return res.status(401).json({ error: "User does not exist" });
    }

    if (user.password) {
      const is_password = await bcrypt.compare(password, user.password);

      if (!is_password) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
    }
    const payload = { username: user.username };
    // Generate a JWT token
    const token = jwt.sign(payload, JWT_SECRET);
    res.cookie("token", token, {
      sameSite: "None",
      secure: process.env.NODE_ENV === "production",
    });
    res.json({
      user: { username: user.username, id: user.id, role: user.role },
    });
  } catch (error) {
    res.status(500).send({ error: "Password or username is incorrect" });
  }
});

router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Authentication successful", user: req.user });
});

router.post("/logout", async (req, res) => {
  // Clear the token cookie
  res.clearCookie("token");

  return res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;