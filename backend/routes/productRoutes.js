const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let products = await Product.find();
    if (!products.length) {
      const mock = [
        { name: "T-shirt", price: 499, image: "https://picsum.photos/200" },
        { name: "Shoes", price: 999, image: "https://picsum.photos/201" },
        { name: "Watch", price: 1299, image: "https://picsum.photos/202" },
        { name: "Cap", price: 299, image: "https://picsum.photos/203" },
        { name: "Bag", price: 799, image: "https://picsum.photos/204" }
      ];
      products = await Product.insertMany(mock);
    }
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
