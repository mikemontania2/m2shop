"use client"

import type React from "react"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import productService, { type Product } from "../services/productService"
import { useApp } from "../contexts/AppContext"
import { ShoppingCart, Check, ChevronLeft, ChevronRight } from "lucide-react"
import ProductCarousel from "../components/ProductCarousel"
import "../styles/productDetail.css"

const ProductDetailPage: React.FC<{ productId?: number }> = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const { addToCart } = useApp()
  const params = useParams()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [params.id, productId])

  useEffect(() => {
    const idFromRoute = params.id ? Number.parseInt(params.id) : productId
    const productData = idFromRoute !== undefined ? productService.getProductById(idFromRoute) : undefined
    if (productData) {
      console.log(productData)
      setProduct(productData)
      setSelectedSize(productData.sizes[0])
      setSelectedColor(productData.colors[0])
    }
  }, [params.id, productId])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-PY", {
      style: "currency",
      currency: "PYG",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleAddToCart = () => {
    if (product && selectedSize && selectedColor) {
      addToCart(product, quantity, selectedSize, selectedColor)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }
  }

  const relatedProducts = useMemo(() => {
    if (!product) return [] as Product[]
    return productService
      .getProductsByCategory(product.category)
      .filter((p) => p.id !== product.id)
      .slice(0, 12)
  }, [product])

  if (!product) {
    return (
      <div className="container">
        <p>Producto no encontrado</p>
      </div>
    )
  }

  const hasDiscount = product.originalPrice > 0
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="product-detail-grid">
          <div className="product-images">
            <div className="main-image">
              <img src={product.images[selectedImage] || "/placeholder.svg"} alt={product.name} />
              {hasDiscount && <span className="discount-badge">-{discountPercentage}%</span>}
              {product.images.length > 1 && (
                <>
                  <button className="image-nav-btn prev" onClick={() => setSelectedImage((i) => Math.max(0, i - 1))}>
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    className="image-nav-btn next"
                    onClick={() => setSelectedImage((i) => Math.min(product.images.length - 1, i + 1))}
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="thumbnail-images">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className={selectedImage === index ? "active" : ""}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="product-details">
            <h1>{product.name}</h1>

            <div className="product-price-section">
              <div className="price-row">
                <span className="current-price">{formatPrice(product.price)}</span>
                {hasDiscount && (
                  <>
                    <span className="original-price">{formatPrice(product.originalPrice)}</span>
                    <span className="discount-tag">¡Ahorrás {formatPrice(product.originalPrice - product.price)}!</span>
                  </>
                )}
              </div>
            </div>

            <p className="product-description">{product.descripcion || product.description}</p>

            {product.propiedades && product.propiedades.length > 0 && (
              <div className="product-specs">
                <h3>Propiedades</h3>
                <ul>
                  {product.propiedades.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.usosRecomendados && product.usosRecomendados.length > 0 && (
              <div className="product-uses">
                <h3>Usos Recomendados</h3>
                <ul>
                  {product.usosRecomendados.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="product-options">
              <div className="option-group">
                <label>Talle:</label>
                <div className="size-options">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? "active" : ""}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="option-group">
                <label>Color:</label>
                <div className="color-options">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`color-btn ${selectedColor === color ? "active" : ""}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="option-group">
                <label>Cantidad:</label>
                <div className="quantity-selector">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    min="1"
                  />
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>
            </div>

            <div className="product-actions">
              <button className="btn-add-cart" onClick={handleAddToCart}>
                <ShoppingCart size={20} />
                Agregar al Carrito
              </button>
              {showSuccess && (
                <div className="success-message">
                  <Check size={20} />
                  Producto agregado al carrito
                </div>
              )}
            </div>

            <div className="product-info-list">
              <p>
                <strong>Stock:</strong> {product.stock > 0 ? `${product.stock} unidades disponibles` : "Sin stock"}
              </p>
              <p>
                <strong>Categoría:</strong> {product.category}
              </p>
            </div>
          </div>
        </div>
        <div className="product-tabs">
          <div className="tab-list">
            <button className="tab-btn active">Descripción</button>
            <button className="tab-btn">Composición</button>
            <button className="tab-btn">Cuidados</button>
          </div>
          <div className="tab-panel">
            <p>{product.descripcion || product.description}</p>
          </div>
        </div>

        <ProductCarousel
          title="Productos relacionados"
          products={relatedProducts}
          slideBy={1}
          autoPlay
          autoPlayIntervalMs={5500}
          onAddToCart={(p, q) => addToCart(p, q, p.sizes[0], p.colors[0])}
        />
      </div>
    </div>
  )
}

export default ProductDetailPage
