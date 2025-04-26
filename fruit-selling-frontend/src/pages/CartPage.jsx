"use client"

import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CartContext } from "../contexts/CartContext"
import { AuthContext } from "../contexts/AuthContext"
import "./CartPage.css"

const CartPage = () => {
  const { cartItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useContext(CartContext)
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (!currentUser) {
      if (confirm("You need to login before checkout. Would you like to login now?")) {
        navigate("/login", { state: { from: { pathname: "/checkout" } } })
      }
    } else {
      navigate("/checkout")
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1 className="page-title">Your Cart</h1>
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any fruits to your cart yet.</p>
            <Link to="/fruits" className="btn btn-primary mt-4">
              Browse Fruits
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Your Cart</h1>

        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-image">
                  <img
                    src={item.image || "/placeholder.jpg"}
                    alt={item.name}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = "/placeholder.jpg"
                    }}
                  />
                </div>

                <div className="cart-item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">₹{item.price?.toFixed(2) || "0.00"}</p>
                  <p className="item-seller">Seller: {item.seller || "Unknown"}</p>
                </div>

                <div className="cart-item-quantity">
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button className="quantity-btn" onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-total">₹{(item.price * item.quantity).toFixed(2)}</div>

                <button className="remove-item-btn" onClick={() => removeFromCart(item._id)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>

            <button className="btn btn-primary btn-block" onClick={handleCheckout}>
              Proceed to Checkout
            </button>

            <button className="btn btn-secondary btn-block mt-2" onClick={clearCart}>
              Clear Cart
            </button>

            <div className="continue-shopping">
              <Link to="/fruits">
                <i className="fas fa-arrow-left"></i> Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage

