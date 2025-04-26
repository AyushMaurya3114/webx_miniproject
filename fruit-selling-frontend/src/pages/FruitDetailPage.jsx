"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { CartContext } from "../contexts/CartContext"
import api from "../utils/api"
import "./FruitDetailPage.css"

const FruitDetailPage = () => {
  const { id } = useParams()
  const [fruit, setFruit] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useContext(CartContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFruit = async () => {
      try {
        const response = await api.get("/fruit/get-fruits")
        const foundFruit = response.data.find((f) => f._id === id)

        if (foundFruit) {
          setFruit(foundFruit)
        } else {
          setError("Fruit not found")
        }
        setLoading(false)
      } catch (error) {
        console.error("Error fetching fruit:", error)
        setError("Failed to load fruit details. Please try again later.")
        setLoading(false)
      }
    }

    fetchFruit()
  }, [id])

  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value)
    if (value > 0) {
      setQuantity(value)
    }
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleAddToCart = () => {
    addToCart(fruit, quantity)
    alert(`${quantity} ${fruit.name}(s) added to cart!`)
  }

  const handleBuyNow = () => {
    addToCart(fruit, quantity)
    navigate("/checkout")
  }

  if (loading) {
    return <div className="spinner"></div>
  }

  if (error || !fruit) {
    return (
      <div className="container">
        <div className="alert alert-danger">{error || "Fruit not found"}</div>
        <button className="btn btn-primary" onClick={() => navigate("/fruits")}>
          Back to Fruits
        </button>
      </div>
    )
  }

  return (
    <div className="fruit-detail-page">
      <div className="container">
        <div className="fruit-detail-container">
          <div className="fruit-image-container">
            <img
              src={fruit.image || "/placeholder.jpg"}
              alt={fruit.name}
              className="fruit-detail-image"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = "/placeholder.jpg"
              }}
            />console.log("Image:", {fruit.image});
          </div>

          <div className="fruit-info-container">
            <h1 className="fruit-name">{fruit.name}</h1>
            <p className="fruit-price">${fruit.price?.toFixed(2) || "0.00"}</p>

            <div className="fruit-description">
              <p>{fruit.description || "No description available."}</p>
            </div>

            <div className="fruit-seller">
              <span className="seller-label">Seller:</span>
              <span className="seller-name">{fruit.seller || "Unknown"}</span>
            </div>

            <div className="quantity-selector">
              <span className="quantity-label">Quantity:</span>
              <div className="quantity-controls">
                <button className="quantity-btn" onClick={decrementQuantity} disabled={quantity <= 1}>
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="quantity-input"
                />
                <button className="quantity-btn" onClick={incrementQuantity}>
                  +
                </button>
              </div>
            </div>

            <div className="fruit-actions">
              <button className="btn btn-primary" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="btn btn-secondary" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FruitDetailPage

