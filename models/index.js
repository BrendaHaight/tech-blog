const Sequelize = require("sequelize");
const sequelize = require("../config/connection");

const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");

// Define associations
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

module.exports = {
  User,
  Post,
  Comment,
  sequelize,
};
