const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateWallet = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.wallet = amount; // OR increment logic
    await user.save();

    res.json({
      message: "Wallet updated",
      wallet: user.wallet
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};