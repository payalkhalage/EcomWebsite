// backend/routes/user.js
const express=require("express")
const User=require("../models/User")

const router = express.Router();

// Get user's cart & wishlist
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    let user = await User.findOne({ username });
    if (!user) {
      // Create mock user if not exists
      user = await User.create({ username, cart: [], wishlist: [] });
    }
    res.json({ cart: user.cart, wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Update cart
router.post("/:username/cart", async (req, res) => {
  try {
    const { username } = req.params;
    const { cart } = req.body;
    const user = await User.findOneAndUpdate(
      { username },
      { cart },
      { new: true, upsert: true }
    );
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update cart", error: err.message });
  }
});

// Update wishlist
router.post("/:username/wishlist", async (req, res) => {
  try {
    const { username } = req.params;
    const { wishlist } = req.body;
    const user = await User.findOneAndUpdate(
      { username },
      { wishlist },
      { new: true, upsert: true }
    );
    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update wishlist", error: err.message });
  }
});


module.exports = router;
