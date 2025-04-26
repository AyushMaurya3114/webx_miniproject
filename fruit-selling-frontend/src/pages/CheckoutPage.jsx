"use client"

import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../contexts/CartContext"
import { AuthContext } from "../contexts/AuthContext"
import api from "../utils/api"
import "./CheckoutPage.css"

const CheckoutPage = () => {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext)
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: "",
    email: currentUser?.email || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required"
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required"
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty")
      navigate("/fruits")
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare order data
      const orderData = {
        email: formData.email,
        items: cartItems.map((item) => ({
          fruit_id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: totalPrice,
        customerInfo: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          phone: formData.phone,
        },
        orderDate: new Date().toISOString(),
      }

      // Place order
      const response = await api.post("/order/place-order", orderData)

      // Generate a random order ID for demo purposes
      // In a real app, this would come from the backend
      const orderId = Math.random().toString(36).substring(2, 10)

      // Clear cart
      clearCart()

      // Navigate to receipt page
      navigate(`/receipt/${orderId}`, { state: { order: orderData } })
    } catch (error) {
      console.error("Checkout error:", error)
      setErrors({
        form: error.response?.data?.error || "Failed to place order. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <h1 className="page-title">Checkout</h1>
          <div className="empty-cart-message">
            <p>Your cart is empty. Please add some items before checkout.</p>
            <button className="btn btn-primary" onClick={() => navigate("/fruits")}>
              Browse Fruits
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>

        {errors.form && <div className="alert alert-danger">{errors.form}</div>}

        <div className="checkout-container">
          <div className="shipping-info">
            <h2 className="section-title">Shipping Information</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <div className="error-message">{errors.fullName}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className={`form-control ${errors.address ? "is-invalid" : ""}`}
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && <div className="error-message">{errors.address}</div>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className={`form-control ${errors.city ? "is-invalid" : ""}`}
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {errors.city && <div className="error-message">{errors.city}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    className={`form-control ${errors.state ? "is-invalid" : ""}`}
                    value={formData.state}
                    onChange={handleChange}
                  />
                  {errors.state && <div className="error-message">{errors.state}</div>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="zipCode" className="form-label">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    className={`form-control ${errors.zipCode ? "is-invalid" : ""}`}
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                  {errors.zipCode && <div className="error-message">{errors.zipCode}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <div className="error-message">{errors.phone}</div>}
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Place Order"}
              </button>
            </form>
          </div>

          <div className="order-summary">
            <h2 className="section-title">Order Summary</h2>

            <div className="order-items">
              {cartItems.map((item) => (
                <div key={item._id} className="order-item">
                  <div className="item-image">
                    <img
                      src={item.image || "/placeholder.jpg"}
                      alt={item.name}
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "/placeholder.jpg"
                      }}
                    />
                  </div>
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-price">
                    ₹{item.price?.toFixed(2) || "0.00"} x {item.quantity}
                    </p>
                  </div>
                  <div className="item-total">{(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>{totalPrice.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage

