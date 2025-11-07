import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getUserData, updateCart, updateWishlist } from "./api";
import { useState ,useEffect} from "react";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import CartPage from "./components/CartPage";
import Checkout from "./components/Checkout";
import WishlistPage from "./components/WishListPage"; // ✅ new page
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";


export default function App() {
  // const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  // const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem("wishlist")) || []);
 const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const handleAdd = (product) => {
    const exist = cart.find((i) => i._id === product._id);
    if (exist) {
      setCart(cart.map((i) => i._id === product._id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const handleRemove = (item) => setCart(cart.filter((i) => i._id !== item._id));

  const toggleLike = (product) => {
    if (wishlist.find((i) => i._id === product._id)) {
      setWishlist(wishlist.filter((i) => i._id !== product._id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const handleUpdateQty = (product, newQty) => {
    setCart((prev) =>
      prev.map((item) => (item._id === product._id ? { ...item, qty: newQty } : item))
    );
  };


    useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getUserData();
        setCart(res.data.cart);
        setWishlist(res.data.wishlist);
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };
    fetchUserData();
  }, []);
  // Persist to localStorage whenever cart or wishlist changes
  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // }, [cart]);

  // useEffect(() => {
  //   localStorage.setItem("wishlist", JSON.stringify(wishlist));
  // }, [wishlist]);



   useEffect(() => {
    if (cart.length > 0) updateCart(cart);
  }, [cart]);

  // Persist wishlist on change
  useEffect(() => {
    if (wishlist.length > 0) updateWishlist(wishlist);
  }, [wishlist]);
  return (
    <Router>
      <Navbar cartCount={cart.reduce((sum, i) => sum + i.qty, 0)} wishlistCount={wishlist.length} />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<ProductList onAddToCart={handleAdd} onLikeToggle={toggleLike} wishlist={wishlist} />}
          />
          <Route path="/cart" element={<CartPage cart={cart} onRemove={handleRemove} onUpdateQty={handleUpdateQty} />} />
          <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
          <Route path="/wishlist" element={<WishlistPage wishlist={wishlist} onLikeToggle={toggleLike} />} />
        </Routes>
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} theme="colored" />
    </Router>
  );
}
