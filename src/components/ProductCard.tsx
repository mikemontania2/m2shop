"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ShoppingCart } from "lucide-react"
import type { Product } from "../interfaces/Productos.interface"

interface ProductCardProps {
  product: Product
  onProductClick?: (productId: number) => void
  onAddToCart: (product: Product, quantity: number) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-PY", {
      style: "currency",
      currency: "PYG",
      minimumFractionDigits: 0,
    }).format(price)
  }
 const  formatProductName = (name: string)  =>{
  if (!name) return ''
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

  const hasDiscount = product.originalPrice > 0

  const handleQuantityChange = (delta: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setQuantity(Math.max(1, quantity + delta))
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    onAddToCart(product, quantity)
    setQuantity(1)
  }

  const handleCardClick = () => {
    onProductClick?.(product.id)
    navigate(`/producto/${product.slug}`)
  }

  // 🏷️ Selección inteligente de etiqueta
  const badge = hasDiscount
    ? {
        src: "/src/imagenes/sello-oferta-58ee791d6fa589732608a9b17ae81efd411d88eee7ada8d0cb6e219b4267cf8b.png",
        alt: "Oferta",
        className: "product-badge-oferta-img",
      }
    : product.news
    ? {
        src: "/src/imagenes/new.png",
        alt: "Nuevo",
        className: "product-badge-nuevo",
      }
    : product.featured
    ? {
        src: "/src/imagenes/destacado_amarillo.png",
        alt: "Destacado",
        className: "product-badge-destacado",
      }
    : null

  return (
    <div className="product-card-wrap">
      <div className="product-image-card" onClick={handleCardClick}>
        {/* Renderiza solo una etiqueta si existe */}
        {badge && <img src={badge.src} alt={badge.alt} className={badge.className} />}

        <div className="product-image">
          <img src={product.image || "/placeholder.svg"} alt={product.name} />
        </div>
      </div>

      <div className="product-info-section">
        <span className="product-name">{ formatProductName(product.name )}</span>

        <div className="product-price">
          <span className="current-price">{formatPrice(product.price)}</span>
          {hasDiscount && <span className="original-price">{formatPrice(product.originalPrice)}</span>}
        </div>

        <div className="product-card-quantity">
          <button
            onClick={(e) => handleQuantityChange(-1, e)}
            className="quantity-btn-circle"
            aria-label="Disminuir cantidad"
          >
            −
          </button>
          <div className="quantity-display-rounded">{quantity}</div>
          <button
            onClick={(e) => handleQuantityChange(1, e)}
            className="quantity-btn-circle"
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>
      </div>

      <button className="btn-add-to-cart-card" onClick={handleAddToCart}>
        <ShoppingCart size={16} />
        Agregar al carrito
      </button>
    </div>
  )
}

export default ProductCard
