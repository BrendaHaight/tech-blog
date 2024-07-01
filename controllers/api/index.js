const router = require("express").Router();

const userRoutes = require("./userRouter");
const postRoutes = require("./postRouter");
const commentRoutes = require("./commentsRouter");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
