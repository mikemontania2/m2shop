"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getVarianteDetalle } from "../services/productos.service"
import type { VarianteDetalleModel, VarianteOpcionValor } from "../interfaces/VarianteDetalleModel.interface"
import { useApp } from "../contexts/AppContext"
import { ShoppingCart, Check, ChevronLeft, ChevronRight } from "lucide-react"
import "../styles/productDetail.css"

const ProductDetailPage: React.FC<{ productSlug?: string }> = ({ productSlug }) => {
  const [product, setProduct] = useState<VarianteDetalleModel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState(1)
  const { addToCart } = useApp()
  const params = useParams()
  const navigate = useNavigate()

  // Obtener todas las imágenes disponibles (principal + imágenes de valores seleccionados)
  const getAllImages = () => {
    if (!product) return []
    const images = [product.imagenPrincipal]
    
    product.opciones.forEach(opcion => {
      const valorSeleccionado = opcion.valores.find(v => v.seleccionado)
      if (valorSeleccionado?.imagenUrl && valorSeleccionado.imagenUrl !== product.imagenPrincipal) {
        images.push(valorSeleccionado.imagenUrl)
      }
    })
    
    return images
  }

  const images = getAllImages()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [params.slug, productSlug])

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true)
      setError(false)
      
      try {
        const slug = params.slug || productSlug
        if (!slug) {
          setError(true)
          return
        }

        const productData = await getVarianteDetalle(slug)
        setProduct(productData)
        setSelectedImage(0)
      } catch (err) {
        console.error("Error al cargar el producto:", err)
        setError(true)
        // Redirigir al home después de 2 segundos si hay error
        setTimeout(() => {
          navigate("/")
        }, 2000)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params.slug, productSlug, navigate])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-PY", {
      style: "currency",
      currency: "PYG",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleOptionChange = (valor: VarianteOpcionValor) => {
    // Si ya está seleccionado, no hacer nada
    if (valor.seleccionado) return

    // Navegar al slug del nuevo valor
    navigate(`/producto/${valor.slug}`)
  }

  const handleAddToCart = () => {
    if (product) {
      // Crear objeto con las opciones seleccionadas
      const selectedOptions = product.opciones.reduce((acc, opcion) => {
        const valorSeleccionado = opcion.valores.find(v => v.seleccionado)
        if (valorSeleccionado) {
          acc[opcion.nombre] = valorSeleccionado.valor
        }
        return acc
      }, {} as Record<string, string>)

      // Adaptar al formato del carrito existente
      const cartItem = {
        id: product.id,
        name: product.nombre,
        price: product.precio,
        originalPrice: product.precioOriginal,
        images: [product.imagenPrincipal],
        category: "", // No viene en el modelo
        stock: 999, // No viene en el modelo
        sizes: [], // Ya no se usa
        colors: [], // Ya no se usa
        description: product.descripcion,
        featured: product.destacado,
        slug: product.slug
      }

      addToCart(cartItem, quantity, selectedOptions.Presentación || "", selectedOptions.Variedad || "")
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '400px',
            fontSize: '1.2rem',
            color: '#6c757d'
          }}>
            Cargando producto...
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '400px',
            gap: '16px'
          }}>
            <p style={{ fontSize: '1.2rem', color: '#dc2626', fontWeight: 600 }}>
              Producto no encontrado
            </p>
            <p style={{ color: '#6c757d' }}>
              Redirigiendo al inicio...
            </p>
          </div>
        </div>
      </div>
    )
  }

  const hasDiscount = product.precioOriginal > 0 && product.precioOriginal > product.precio
  const discountPercentage = product.descuentoPorcentaje || "0"

  // Limpiar HTML para descripción
  const getCleanDescription = (html: string) => {
    const div = document.createElement("div")
    div.innerHTML = html
    return div.textContent || div.innerText || ""
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="product-detail-grid">
          <div className="product-images">
            <div className="main-image">
              <img 
                src={images[selectedImage] || "/placeholder.svg"} 
                alt={product.nombre}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg"
                }}
              />
              {hasDiscount && <span className="discount-badge">-{+discountPercentage}%</span>}
              {images.length > 1 && (
                <>
                  <button 
                    className="image-nav-btn prev" 
                    onClick={() => setSelectedImage((i) => Math.max(0, i - 1))}
                    disabled={selectedImage === 0}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    className="image-nav-btn next"
                    onClick={() => setSelectedImage((i) => Math.min(images.length - 1, i + 1))}
                    disabled={selectedImage === images.length - 1}
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="thumbnail-images">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${product.nombre} ${index + 1}`}
                    className={selectedImage === index ? "active" : ""}
                    onClick={() => setSelectedImage(index)}
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg"
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="product-details">
            <h1>{product.nombre}</h1>


            <p className="product-description">
              {getCleanDescription(product.descripcion)}
            </p>
            <div className="product-price-section">
              <div className="price-row">
                <span className="current-price">{formatPrice(product.precio)}</span>
                {hasDiscount && (
                  <>
                    <span className="original-price">{formatPrice(product.precioOriginal)}</span>
                    <span className="discount-tag">
                      ¡Ahorrás {formatPrice(product.precioOriginal - product.precio)}!
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="product-options">
              {product.opciones
                .sort((a, b) => a.orden - b.orden)
                .map((opcion) => (
                  <div key={opcion.id} className="option-group">
                    <label>{opcion.nombre}:</label>
                    <div className={opcion.nombre.toLowerCase().includes("color") || opcion.nombre.toLowerCase().includes("variedad") ? "color-options" : "size-options"}>
                      {opcion.valores.map((valor) => {
                        const hasColor = valor.metadata?.color
                        const hasImage = valor.metadata?.imagen

                        if (hasColor) {
                          // Mostrar como botón de color
                          return (
                            <button
                              key={valor.id}
                              className={`color-btn ${valor.seleccionado ? "active" : ""}`}
                              onClick={() => handleOptionChange(valor)}
                              style={{
                                backgroundColor: valor.seleccionado ? valor.metadata.color : 'transparent',
                                borderColor: valor.metadata.color,
                                color: valor.seleccionado ? '#fff' : '#495057'
                              }}
                              title={valor.valor}
                            >
                              {valor.valor}
                            </button>
                          )
                        } else if (hasImage) {
                          // Mostrar con icono de imagen
                          return (
                            <button
                              key={valor.id}
                              className={`size-btn ${valor.seleccionado ? "active" : ""}`}
                              onClick={() => handleOptionChange(valor)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                              }}
                            >
                              <img 
                                src={valor.metadata.imagen} 
                                alt={valor.valor}
                                style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none'
                                }}
                              />
                              <span>{valor.valor}</span>
                            </button>
                          )
                        } else {
                          // Mostrar como botón normal
                          return (
                            <button
                              key={valor.id}
                              className={`size-btn ${valor.seleccionado ? "active" : ""}`}
                              onClick={() => handleOptionChange(valor)}
                            >
                              {valor.valor}
                            </button>
                          )
                        }
                      })}
                    </div>
                  </div>
                ))}

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
                <strong>SKU:</strong> {product.sku}
              </p>
              {product.destacado && (
                <p>
                  <strong>⭐ Producto Destacado</strong>
                </p>
              )}
              {product.nuevo && (
                <p>
                  <strong>🆕 Producto Nuevo</strong>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="product-tabs">
          <div className="tab-list">
   
            <button 
              className={`tab-btn ${activeTab === 1 ? "active" : ""}`}
              onClick={() => setActiveTab(1)}
            >
              Propiedades
            </button>
            <button 
              className={`tab-btn ${activeTab === 2 ? "active" : ""}`}
              onClick={() => setActiveTab(2)}
            >
              Usos Recomendados
            </button>
          </div>
          <div className="tab-panel">
             
            {activeTab === 1 && product.propiedades && (
              <ul style={{ margin: 0, paddingLeft: '24px' }}>
                {product.propiedades.map((p, i) => (
                  <li key={i} style={{ marginBottom: '8px' }}>{p}</li>
                ))}
              </ul>
            )}
            {activeTab === 2 && product.usosRecomendados && (
              <ul style={{ margin: 0, paddingLeft: '24px' }}>
                {product.usosRecomendados.map((u, i) => (
                  <li key={i} style={{ marginBottom: '8px' }}>{u}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Productos relacionados - descomentá cuando lo necesites */}
        {/* <ProductCarousel
          title="Productos relacionados"
          products={relatedProducts}
          slideBy={1}
          autoPlay
          autoPlayIntervalMs={5500}
          onAddToCart={(p, q) => addToCart(p, q, "", "")}
        /> */}
      </div>
    </div>
  )
}

export default ProductDetailPage