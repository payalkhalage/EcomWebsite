// import { Link } from "react-router-dom";
// import "./CartPage.css"

// export default function CartPage({ cart, onRemove, onUpdateQty }) {
//   const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);


//   const handleQtyChange = (item, delta) => {
//     const newQty = item.qty + delta;
//     if (newQty < 1) return; // prevent negative/zero
//     onUpdateQty(item, newQty);
//   };

//   return (
//     <div className="cart-page">
//       <h2>🛒 Your Cart</h2>
//       {cart.length === 0 ? (
//         <p>
//           Your cart is empty. <Link to="/">Shop Now</Link>
//         </p>
//       ) : (
//         <>
//           {cart.map((item) => (
//             <div key={item._id} className="cart-item">
//               <img src={item.image} alt={item.name} />
//               <div className="cart-item-details">
//                 <h4>{item.name}</h4>
//                 <p>₹{item.price}</p>

//                 <div className="qty-controls">
//                   <button onClick={() => handleQtyChange(item, -1)}>-</button>
//                   <span>{item.qty}</span>
//                   <button onClick={() => handleQtyChange(item, 1)}>+</button>
//                 </div>
//               </div>

//               <button className="remove-btn" onClick={() => onRemove(item)}>
//                 Remove
//               </button>
//             </div>
//           ))}

//           <h3>Total: ₹{total}</h3>
//           <Link to="/checkout" className="checkout-btn">
//             Proceed to Checkout
//           </Link>
//         </>
//       )}
//     </div>
//   );
// }





import { Link, useNavigate } from "react-router-dom";
import "./CartPage.css";

export default function CartPage({ cart, onRemove, onUpdateQty }) {
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const navigate = useNavigate();

  const handleQtyChange = (item, delta) => {
    const newQty = item.qty + delta;
    if (newQty < 1) return;
    onUpdateQty(item, newQty);
  };

  return (
    <div className="cart-page">
      <h2>🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/">Shop Now</Link>
        </p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
                <div className="qty-controls">
                  <button onClick={() => handleQtyChange(item, -1)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => handleQtyChange(item, 1)}>+</button>
                </div>
              </div>
              <button className="remove-btn" onClick={() => onRemove(item)}>
                Remove
              </button>
            </div>
          ))}
          <h3>Total: ₹{total}</h3>
          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout
          </Link>
        </>
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
