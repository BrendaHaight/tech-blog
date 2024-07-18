const express = require("express");
const { User } = require("../../models");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// Sign up route
router.post("/signup", async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log request body

    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.json({ user: newUser, message: "You are now logged in!" });
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(400).json({ message: "User registration failed", error });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res
        .status(400)
        .json({
          message: "Email not found. Please sign up before logging in.",
        });
      return;
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;

      res.json({ user: user, message: "You are now logged in!" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Logout route
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json(err);
        return;
      }

      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
