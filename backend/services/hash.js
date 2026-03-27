const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const User = require("../models/User");

const createAdmin = async () => {
  try {
    // connect DB
    await mongoose.connect(process.env.MONGO_URI);

    // hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // create admin user
    const admin = await User.create({
      name: "Admin",
      email: "admin@test.com",
      password: hashedPassword,
      wallet: 0,
      isAdmin: true
    });

    console.log("✅ Admin created:", admin.email);

    process.exit();
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

createAdmin();