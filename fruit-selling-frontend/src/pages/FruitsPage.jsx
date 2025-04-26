"use client"

import { useState, useEffect } from "react"
import api from "../utils/api"
import FruitCard from "../components/FruitCard"
import "./FruitsPage.css"

const FruitsPage = () => {
  const [fruits, setFruits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const response = await api.get("/fruit/get-fruits")
        setFruits(response.data || [])
        setLoading(false)
      } catch (error) {
        console.error("Error fetching fruits:", error)
        setError("Failed to load fruits. Please try again later.")
        setLoading(false)
      }
    }

    fetchFruits()
  }, [])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredFruits = fruits.filter(
    (fruit) =>
      fruit.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (fruit.description && fruit.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (loading) {
    return <div className="spinner"></div>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  return (
    <div className="fruits-page">
      <div className="container">
        <h1 className="page-title">All Fruits</h1>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search fruits..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        {filteredFruits.length > 0 ? (
          <div className="fruits-grid">
            {filteredFruits.map((fruit) => (
              <FruitCard key={fruit._id || fruit.name + fruit.price} fruit={fruit} />
            ))}
          </div>
        ) : (
          <div className="no-fruits-message">
            {searchTerm ? "No fruits match your search." : "No fruits available at the moment."}
          </div>
        )}
      </div>
    </div>
  )
}

export default FruitsPage
