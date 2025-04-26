"use client"

import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import { CartContext } from "../contexts/CartContext"
import "./Navbar.css"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { currentUser, logout } = useContext(AuthContext)
  const { totalItems } = useContext(CartContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">FruitMarket</span>
        </Link>

        <div className="navbar-links-container">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/fruits" className="navbar-link">
            Fruits
          </Link>

          {currentUser && currentUser.role === "seller" && (
            <Link to="/seller/dashboard" className="navbar-link">
              Dashboard
            </Link>
          )}
        </div>

        <div className="navbar-actions">
          <Link to="/cart" className="cart-icon">
            <i className="fas fa-shopping-cart"></i>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

          {currentUser ? (
            <div className="user-menu">
              <button className="user-menu-button">
                <i className="fas fa-user"></i>
                <span className="user-email">{currentUser.email}</span>
              </button>
              <div className="user-dropdown">
                {/* <Link to="/profile" className="dropdown-item">
                  My Profile
                </Link> */}
                <button onClick={handleLogout} className="dropdown-item logout-button">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-button">
                Login
              </Link>
              <Link to="/register" className="register-button">
                Register
              </Link>
            </div>
          )}

          <button className="mobile-menu-toggle" onClick={toggleMenu}>
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <Link to="/" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
        <Link to="/fruits" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
          Fruits
        </Link>
        <Link to="/cart" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
          Cart
        </Link>

        {currentUser && currentUser.role === "seller" && (
          <Link to="/seller/dashboard" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
            Dashboard
          </Link>
        )}

        {currentUser ? (
          <>
            <Link to="/profile" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
              My Profile
            </Link>
            <button onClick={handleLogout} className="mobile-menu-link logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
            <Link to="/register" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar

