const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Create a new comment
router.post("/", withAuth, async (req, res) => {
  console.log("Hello World");
  try {
    console.log("Session User ID:", req.session.user_id); // Log the session user ID
    console.log("Request Body:", req.body); // Log the request body
    const newComment = await Comment.create({
      comment_text: req.body.comment_text,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(400).json({ message: "Error creating comment", error: err });
  }
});

// Delete a comment
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json(err);
  }
});

module.exports = router;
