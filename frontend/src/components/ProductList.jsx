import { useEffect, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { api } from "../api";
import "./ProductList.css";

export default function ProductList({ onAddToCart, onLikeToggle, wishlist }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // 1️⃣ Try fetching from Fake API first
        const res = await fetch("https://fakestoreapi.com/products?limit=10");
        if (!res.ok) throw new Error("Fake API failed");
        const data = await res.json();
        const mapped = data.map((p) => ({
          _id: p.id,
          name: p.title,
          price: Math.round(p.price * 90),
          image: p.image,
        }));
        setProducts(mapped);
      } catch (fakeApiErr) {
        console.warn("⚠️ Fake API failed:", fakeApiErr.message);
        try {
          // 2️⃣ If fake API fails, fetch from backend
          const backendRes = await api.get("/products");
          setProducts(backendRes.data);
          setError("Fake API failed, loaded from backend.");
        } catch (backendErr) {
          console.error("⚠️ Backend also failed:", backendErr.message);
          setError("Failed to load products.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "30px" }}>Loading products...</p>;
  if (!products.length)
    return <p style={{ textAlign: "center", marginTop: "30px" }}>No products available.</p>;

  return (
    <div className="container">
      {error && (
        <div style={{ color: "#ff4757", textAlign: "center", marginBottom: "10px" }}>
          {error}
        </div>
      )}
      <div className="product-grid">
        {products.map((p) => {
          const liked = wishlist?.some((item) => item._id === p._id);

          return (
            <div key={p._id} className="product-card">
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p>₹{p.price}</p>

              <div className="icon-row">
                <button
                  className="cart-btn"
                  onClick={() => {
                    onAddToCart(p);
                    toast.success(`${p.name} added to cart 🛒`);
                  }}
                >
                  <ShoppingCart />
                </button>

                <Heart
                  className={`like-icon ${liked ? "liked" : ""}`}
                  onClick={() => {
                    onLikeToggle(p);
                    toast.info(liked ? "Removed from wishlist 💔" : "Added to wishlist ❤️");
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
