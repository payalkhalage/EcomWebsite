const express = require("express");
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  const items = await CartItem.find().populate("productId");
  const total = items.reduce(
    (sum, item) => sum + item.productId.price * item.qty,
    0
  );
  res.json({ items, total });
});

router.post("/", async (req, res) => {
  const { productId, qty } = req.body;
  const item = new CartItem({ productId, qty });
  await item.save();
  res.status(201).json(item);
});

router.delete("/:id", async (req, res) => {
  await CartItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed" });
});

router.post("/checkout", async (req, res) => {
  const { cartItems } = req.body;
  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const receipt = { total, timestamp: new Date().toISOString() };
  res.json(receipt);
});

module.exports = router;
