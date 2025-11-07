import { ShoppingCart, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css"
export default function Navbar({ cartCount, wishlistCount }) {
  const location = useLocation();

  return (
    <>
      {/* 🌟 Top Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="logo">🛍 EcomCart</Link>
        </div>

        <div className="nav-right">
          {/* ❤️ Wishlist icon */}
          <Link
            to="/wishlist"
            className={`cart-link ${location.pathname === "/wishlist" ? "active" : ""}`}
            title="Liked Products"
          >
            <Heart className={`cart-icon ${wishlistCount > 0 ? "liked" : ""}`} />
            {wishlistCount > 0 && (
              <span className="cart-badge">{wishlistCount}</span>
            )}
          </Link>

          {/* 🛒 Cart icon */}
          <Link
            to="/cart"
            className={`cart-link ${location.pathname === "/cart" ? "active" : ""}`}
            title="Cart"
          >
            <ShoppingCart className="cart-icon" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </nav>

      {/* 📱 Floating Cart Icon for Mobile */}
      <Link to="/cart" className="floating-cart">
        <ShoppingCart className="cart-icon" />
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </Link>
    </>
  );
}
