"use client"

import { useState, useEffect } from "react"
import api from "../utils/api"
import "./SellerDashboardPage.css"

const SellerDashboardPage = () => {
  const [fruits, setFruits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    seller: "",
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const response = await api.get("/fruit/get-fruits")
        setFruits(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching fruits:", error)
        setError("Failed to load fruits. Please try again later.")
        setLoading(false)
      }
    }

    fetchFruits()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required"
    } else if (isNaN(Number.parseFloat(formData.price)) || Number.parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.seller.trim()) {
      newErrors.seller = "Seller name is required"
    }

    setFormErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const fruitData = {
        name: formData.name,
        price: Number.parseFloat(formData.price),
        description: formData.description,
        image: formData.image || "",
        seller: formData.seller,
      }
      console.log("--------",fruitData)
      console.log("Sending fruit data:", fruitData);
      await api.post("/fruit/add-fruit", fruitData)

      // Refresh fruits list
      const response = await api.get("/fruit/get-fruits")
      setFruits(response.data)

      // Reset form
      setFormData({
        name: "",
        price: "",
        description: "",
        image: "",
        seller: "",
      })

      alert("Fruit added successfully!")
    } catch (error) {
      console.error("Error adding fruit:", error)
      setFormErrors({
        form: error.response?.data?.error || "Failed to add fruit. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <div className="spinner"></div>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  return (
    <div className="seller-dashboard">
      <div className="container">
        <h1 className="page-title">Seller Dashboard</h1>

        <div className="dashboard-container">
          <div className="add-fruit-section">
            <h2 className="section-title">Add New Fruit</h2>

            {formErrors.form && <div className="alert alert-danger">{formErrors.form}</div>}

            <form onSubmit={handleSubmit} className="add-fruit-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Fruit Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
                  value={formData.name}
                  onChange={handleChange}
                />
                {formErrors.name && <div className="error-message">{formErrors.name}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="price" className="form-label">
                  Price (₹)
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  className={`form-control ${formErrors.price ? "is-invalid" : ""}`}
                  value={formData.price}
                  onChange={handleChange}
                />
                {formErrors.price && <div className="error-message">{formErrors.price}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className={`form-control ${formErrors.description ? "is-invalid" : ""}`}
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
                {formErrors.description && <div className="error-message">{formErrors.description}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="image" className="form-label">
                  Image URL (optional)
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  className="form-control"
                  value={formData.image}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="seller" className="form-label">
                  Seller Name
                </label>
                <input
                  type="text"
                  id="seller"
                  name="seller"
                  className={`form-control ${formErrors.seller ? "is-invalid" : ""}`}
                  value={formData.seller}
                  onChange={handleChange}
                />
                {formErrors.seller && <div className="error-message">{formErrors.seller}</div>}
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Fruit"}
              </button>
            </form>
          </div>

          <div className="fruits-list-section">
            <h2 className="section-title">Your Fruits</h2>

            {fruits.length > 0 ? (
              <div className="fruits-table-container">
                <table className="fruits-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Seller</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fruits.map((fruit) => (
                      <tr key={fruit._id}>
                        <td>{fruit.name}</td>
                        <td>${fruit.price?.toFixed(2) || "0.00"}</td>
                        <td>{fruit.seller || "Unknown"}</td>
                        <td>
                          <button className="btn-icon">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="btn-icon delete">
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="no-fruits">
                <p>You haven't added any fruits yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerDashboardPage

