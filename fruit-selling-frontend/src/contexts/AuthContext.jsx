"use client";

import { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user session exists in localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
    if (userInfo) {
      setCurrentUser(userInfo);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { role } = response.data;

      // Store user session details in localStorage
      const userInfo = { email, role };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      setCurrentUser(userInfo);
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.response?.data?.error || "Login failed",
      };
    }
  };

  const register = async (userData) => {
    try {
      await api.post("/auth/register", userData);
      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: error.response?.data?.error || "Registration failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
