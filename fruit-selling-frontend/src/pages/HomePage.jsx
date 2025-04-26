"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../utils/api"
import FruitCard from "../components/FruitCard"
import "./HomePage.css"

const HomePage = () => {
  const [fruits, setFruits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const response = await api.get("/fruit/get-fruits")
        setFruits(response.data?.slice(0, 4) || []) // Get first 4 fruits for featured section
      } catch (error) {
        console.error("Error fetching fruits:", error)
        setError("Failed to load fruits. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchFruits()
  }, [])

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Fresh Fruits Delivered to Your Door</h1>
            <p className="hero-subtitle">
              Shop the best selection of seasonal and exotic fruits from local sellers
            </p>
            <div className="hero-buttons">
              <Link to="/fruits" className="btn btn-primary">
                Shop Now
              </Link>
              <Link to="/register" className="btn btn-secondary">
                Become a Seller
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-truck"></i>
              </div>
              <h3 className="feature-title">Fast Delivery</h3>
              <p className="feature-description">Get your fruits delivered to your doorstep within 24 hours</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-apple-alt"></i>
              </div>
              <h3 className="feature-title">Fresh Selection</h3>
              <p className="feature-description">All our fruits are handpicked for freshness and quality</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <h3 className="feature-title">Organic Options</h3>
              <p className="feature-description">Shop organic fruits grown without harmful pesticides</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Fruits Section */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Fruits</h2>

          {loading ? (
            <div className="spinner"></div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : fruits.length > 0 ? (
            <div className="fruits-grid">
              {fruits.map((fruit) => (
                <FruitCard key={fruit._id?.toString()} fruit={fruit} />
              ))}
            </div>
          ) : (
            <p className="no-fruits-message">No fruits available at the moment.</p>
          )}

          <div className="view-all-link">
            <Link to="/fruits">View All Fruits</Link>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Become a Seller Today</h2>
            <p className="cta-description">List your fruits on our platform and reach more customers</p>
            <Link to="/register" className="btn btn-primary">
              Register as Seller
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage




























