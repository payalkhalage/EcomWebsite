import "./WishlistPage.css";
import { useNavigate } from "react-router-dom";

export default function WishlistPage({ wishlist, onLikeToggle }) {
  const navigate = useNavigate();

  if (wishlist.length === 0)
    return (
      <>
        <h2 style={{ textAlign: "center", marginTop: "40px" }}>
          No liked products yet
        </h2>
        <button
          className="floating-back-home"
          onClick={() => navigate("/")}
          title="Back to Home"
        >
          🏠
        </button>
      </>
    );

  return (
    <div className="product-grid">
      {wishlist.map((product) => (
        <div key={product._id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
          <button
            className="remove-like-btn"
            onClick={() => onLikeToggle(product)}
          >
            Remove ❤️
          </button>
        </div>
      ))}
      {/* Floating Back to Home Button */}
      <button
        className="floating-back-home"
        onClick={() => navigate("/")}
        title="Back to Home"
      >
        🏠
      </button>
    </div>
  );
}
