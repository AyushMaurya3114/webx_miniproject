"use client"

import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import api from "../utils/api"
import "./ProfilePage.css"

const ProfilePage = () => {
  const { currentUser } = useContext(AuthContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/order/get-orders")
        setOrders(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching orders:", error)
        setError("Failed to load orders. Please try again later.")
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (loading) {
    return <div className="spinner"></div>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  return (
    <div className="profile-page">
      <div className="container">
        <h1 className="page-title">My Profile</h1>

        <div className="profile-container">
          <div className="profile-info">
            <h2 className="section-title">Account Information</h2>
            <div className="info-card">
              <div className="info-item">
                <span className="info-label">Email</span>
                <span className="info-value">{currentUser.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Role</span>
                <span className="info-value">{currentUser.role}</span>
              </div>
            </div>
          </div>

          <div className="order-history">
            <h2 className="section-title">Order History</h2>

            {orders.length > 0 ? (
              <div className="orders-list">
                {orders.map((order, index) => (
                  <div key={index} className="order-card">
                    <div className="order-header">
                      <div className="order-id">
                        <span className="label">Order ID:</span>
                        <span className="value">
                          {order._id || `ORD-${Math.random().toString(36).substring(2, 10)}`}
                        </span>
                      </div>
                      <div className="order-date">
                        <span className="label">Date:</span>
                        <span className="value">
                          {new Date(order.orderDate || order.created_at || Date.now()).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="order-status">
                        <span className="status-badge">Completed</span>
                      </div>
                    </div>

                    <div className="order-items">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="order-item">
                          <span className="item-name">{item.name}</span>
                          <span className="item-quantity">x{item.quantity}</span>
                          <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="order-footer">
                      <div className="order-total">
                        <span className="label">Total:</span>
                        <span className="value">${order.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-orders">
                <p>You haven't placed any orders yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

