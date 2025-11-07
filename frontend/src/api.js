// frontend/api.js
import axios from "axios";

export const api = axios.create({ baseURL: "http://localhost:5000/api" });

// User persistence APIs
export const getUserData = async () => {
  return await api.get("/user/mockuser");
};

export const updateCart = async (cart) => {
  return await api.post("/user/mockuser/cart", { cart });
};

export const updateWishlist = async (wishlist) => {
  return await api.post("/user/mockuser/wishlist", { wishlist });
};
