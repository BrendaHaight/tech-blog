const sequelize = require("../config/connection");
const { User, Post } = require("../models");
const userData = require("./userData.json");
const postData = require("./postData.json");
const bcrypt = require("bcrypt");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await Promise.all(
      userData.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );

    await User.bulkCreate(users, {
      individualHooks: true,
      returning: true,
    });

    await Post.bulkCreate(postData);

    console.log("All data seeded successfully!");
  } catch (err) {
    console.error("Failed to seed database:", err);
  } finally {
    process.exit(0);
  }
};

seedDatabase();
