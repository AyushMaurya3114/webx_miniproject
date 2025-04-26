"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../contexts/CartContext"
import "./FruitCard.css"

const FruitCard = ({ fruit }) => {
  const { addToCart } = useContext(CartContext)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(fruit, 1)
  }
  console.log(fruit);

  return (
    <div className="fruit-card">
      <Link to={`/fruits/${fruit._id}`} className="fruit-card-link">
        <div className="fruit-image">
          <img
            src={fruit.image || "/placeholder.jpg"}
            alt={fruit.name || "Unknown Fruit"}
            onError={(e) => {
              e.target.onerror = null
              e.target.src = "/placeholder.jpg"
            }}
          />
        </div>
        <div className="fruit-info">
          <h3 className="fruit-name">{fruit.name || "Unknown"}</h3>
          <p className="fruit-price">₹{fruit.price ? fruit.price.toFixed(2) : "N/A"}</p>
          <p className="fruit-seller">Seller: {fruit.seller || "Unknown"}</p>
          <div className="fruit-description">
            {fruit.description || "No description available."}
          </div>
        </div>
      </Link>
      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  )
}

export default FruitCard
