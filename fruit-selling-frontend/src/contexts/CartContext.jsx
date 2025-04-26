"use client"

import { createContext, useState, useEffect } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalItems, setTotalItems] = useState(0)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setCartItems(parsedCart)
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Update localStorage and calculate totals when cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setTotalPrice(total)

    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    setTotalItems(itemCount)
  }, [cartItems])

  const addToCart = (fruit, quantity = 1) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex((item) => item._id === fruit._id)

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        }
        return updatedItems
      } else {
        // Add new item to cart
        return [...prevItems, { ...fruit, quantity }]
      }
    })
  }

  const removeFromCart = (fruitId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== fruitId))
  }

  const updateQuantity = (fruitId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(fruitId)
      return
    }

    setCartItems((prevItems) => prevItems.map((item) => (item._id === fruitId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        totalItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

