"use client"

import type React from "react"
import { ShoppingCart } from "lucide-react"
import { useApp } from "../../contexts/AppContext"
import { useNavigate } from "react-router-dom"
 
const CartButton: React.FC = () => {
  const { cartCount } = useApp()
  const navigate = useNavigate()
  return (
    <button className="cart-btn" onClick={() => navigate("/carrito")}>
      <ShoppingCart size={24} />
      {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
    </button>
  )
}

export default CartButton
