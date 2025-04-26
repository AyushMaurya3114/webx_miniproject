"use client"

import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"

const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser, loading } = useContext(AuthContext)

  if (loading) {
    return <div className="spinner"></div>
  }

  if (!currentUser) {
    return <Navigate to="/login" />
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to="/" />
  }

  return children
}

export default ProtectedRoute

