// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  cart: [
    {
      productId: String,
      name: String,
      price: Number,
      qty: Number,
      image: String,
    },
  ],
  wishlist: [
    {
      productId: String,
      name: String,
      price: Number,
      image: String,
    },
  ],
});

module.exports= mongoose.model("User", userSchema);

