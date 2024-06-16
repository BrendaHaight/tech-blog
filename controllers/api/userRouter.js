const router = require("express").Router();
const { User } = require("../../models");

// Sign up a new user
router.post("/signup", async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Log in an existing user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      res.status(400).json({ message: "No user found with this username" });
      return;
    }

    const validPassword = await user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: " Incorrect password!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.json({ user, message: "You are now logged in" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Log out the current user
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ messega: "Session destruction failed", error: err });
      }
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
