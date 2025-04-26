"use client"

import { useEffect, useState } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import "./ReceiptPage.css"

const ReceiptPage = () => {
  const { orderId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    if (location.state?.order) {
      setOrder(location.state.order)
    } else {
      navigate("/")
    }
  }, [location, navigate])

  if (!order) {
    return <div className="spinner"></div>
  }

  const { items, totalAmount, customerInfo, orderDate } = order
  const formattedDate = new Date(orderDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="receipt-page">
      <div className="container">
        <div className="receipt-container">
          <div className="receipt-header">
            <h1 className="receipt-title">Order Receipt</h1>
            <p className="receipt-subtitle">Thank you for your order!</p>
          </div>

          <div className="receipt-info">
            <div className="receipt-info-item">
              <span className="info-label">Order ID:</span>
              <span className="info-value">{orderId}</span>
            </div>
            <div className="receipt-info-item">
              <span className="info-label">Date:</span>
              <span className="info-value">{formattedDate}</span>
            </div>
          </div>

          <div className="receipt-section">
            <h2 className="section-title">Customer Information</h2>
            <div className="customer-info">
              <p>
                <strong>Name:</strong> {customerInfo.fullName}
              </p>
              <p>
                <strong>Email:</strong> {customerInfo.email}
              </p>
              <p>
                <strong>Phone:</strong> {customerInfo.phone}
              </p>
              <p>
                <strong>Address:</strong> {customerInfo.address}, {customerInfo.city}, {customerInfo.state}{" "}
                {customerInfo.zipCode}
              </p>
            </div>
          </div>

          <div className="receipt-section">
            <h2 className="section-title">Order Details</h2>
            <table className="order-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>₹{item.price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3">Subtotal</td>
                  <td>₹{totalAmount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="3">Shipping</td>
                  <td>Free</td>
                </tr>
                <tr className="total-row">
                  <td colSpan="3">Total</td>
                  <td>₹{totalAmount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="receipt-footer">
            <p>If you have any questions about your order, please contact our customer service.</p>
            <div className="receipt-actions">
              <button className="btn btn-primary" onClick={() => window.print()}>
                Print Receipt
              </button>
              <button className="btn btn-secondary" onClick={() => navigate("/")}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReceiptPage

