import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import "./Checkout.css";

export default function Checkout({ cart, setCart }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [receipt, setReceipt] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};
    if (!name.trim()) newErrors.name = "Please enter your full name.";
    else if (!/^[a-zA-Z ]{2,30}$/.test(name.trim()))
      newErrors.name = "Name must contain only letters (2-30 chars).";

    if (!email.trim()) newErrors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      newErrors.email = "Please enter a valid email address.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    if (!validateForm()) return;

    try {
      const res = await api.post("/cart/checkout", { cartItems: cart });
      setReceipt(res.data);
      setCart([]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Checkout failed! Please try again.");
    }
  };

  return (
    <div className="checkout-page-container">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={180}
          gravity={0.2}
          wind={0.01}
          tweenDuration={6000}
          recycle={false}
          colors={["#FFD700", "#FF69B4", "#00BFFF", "#32CD32", "#FF4500"]}
        />
      )}

      {!receipt ? (
        <div className="checkout">
          <h2>Checkout</h2>
          <input
            className={errors.name ? "error-input" : ""}
            placeholder="Full Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: "" });
            }}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}

          <input
            className={errors.email ? "error-input" : ""}
            placeholder="Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: "" });
            }}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <button className="checkout-btn" onClick={handleCheckout}>
            Submit Order
          </button>
        </div>
      ) : (
        <div className="receipt">
          <h2>✅ Order Placed Successfully!</h2>
          <p><b>Total:</b> ₹{receipt.total}</p>
          <p><b>Order Time:</b> {new Date(receipt.timestamp).toLocaleString()}</p>
        </div>
      )}

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
