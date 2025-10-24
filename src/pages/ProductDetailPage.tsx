"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getVarianteDetalle } from "../services/productos.service"
import type { VarianteDetalleModel, VarianteOpcionValor } from "../interfaces/VarianteDetalleModel.interface"
import { useApp } from "../contexts/AppContext"
import { ShoppingCart, Check, ChevronLeft, ChevronRight } from "lucide-react"
import LoadingSpinner from "../components/LoadingSpinner"
import "../styles/productDetail.css"

const ProductDetailPage: React.FC<{ productSlug?: string }> = ({ productSlug }) => {
  const [product, setProduct] = useState<VarianteDetalleModel | null>(null)
  const [loading, setLoading] = useState(true)
  const [changingVariant, setChangingVariant] = useState(false)
  const [error, setError] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState<"propiedades" | "usos">("propiedades")
  const { addToCart } = useApp()
  const params = useParams()
  const navigate = useNavigate()

  // Obtener todas las imágenes disponibles (principal + imágenes de valores seleccionados)
  const getAllImages = () => {
    if (!product) return []
    const images = [product.imagenPrincipal]

    product.opciones.forEach((opcion) => {
      const valorSeleccionado = opcion.valores.find((v) => v.seleccionado)
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
        if (productData.propiedades && productData.propiedades.length > 0) {
          setActiveTab("propiedades")
        } else if (productData.usosRecomendados && productData.usosRecomendados.length > 0) {
          setActiveTab("usos")
        }
      } catch (err) {
        console.error("Error al cargar el producto:", err)
        setError(true)
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

  const handleOptionChange = async (valor: VarianteOpcionValor) => {
    if (valor.seleccionado || changingVariant) return

    setChangingVariant(true)
    try {
      const newProductData = await getVarianteDetalle(valor.slug)
      setProduct(newProductData)
      setSelectedImage(0)
      setQuantity(1)
      window.history.pushState({}, "", `/producto/${valor.slug}`)
    } catch (err) {
      console.error("Error al cambiar variante:", err)
    } finally {
      setChangingVariant(false)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      const selectedOptions = product.opciones.reduce(
        (acc, opcion) => {
          const valorSeleccionado = opcion.valores.find((v) => v.seleccionado)
          if (valorSeleccionado) {
            acc[opcion.nombre] = valorSeleccionado.valor
          }
          return acc
        },
        {} as Record<string, string>,
      )

      const cartItem = {
        id: product.id,
        name: product.nombre,
        price: product.precio,
        originalPrice: product.precioOriginal,
        images: [product.imagenPrincipal],
        category: "",
        stock: 999,
        sizes: [],
        colors: [],
        description: product.descripcion,
        featured: product.destacado,
        slug: product.slug,
      }

      addToCart(cartItem, quantity, selectedOptions.Presentación || "", selectedOptions.Variedad || "")
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }
  }

  if (loading) {
    return <LoadingSpinner message="Cargando producto..." fullPage />
  }

  if (error || !product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="error-state">
            <p className="error-title">Producto no encontrado</p>
            <p className="error-subtitle">Redirigiendo al inicio...</p>
          </div>
        </div>
      </div>
    )
  }

  const hasDiscount = product.precioOriginal > 0 && product.precioOriginal > product.precio
  const discountPercentage = product.descuentoPorcentaje || "0"

  const getCleanDescription = (html: string) => {
    const div = document.createElement("div")
    div.innerHTML = html
    return div.textContent || div.innerText || ""
  }

  const hasPropiedades = product.propiedades && product.propiedades.length > 0
  const hasUsos = product.usosRecomendados && product.usosRecomendados.length > 0
  const showTabs = hasPropiedades || hasUsos

  return (
    <div className="product-detail-page">
      {changingVariant && <LoadingSpinner message="Cambiando variante..." fullPage />}

      <div className="container">
        <div className="product-detail-grid">
          <div className="product-images sticky-images">
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

            <p className="product-description">{getCleanDescription(product.descripcion)}</p>

            <div className="product-options">
              {product.opciones
                .sort((a, b) => a.orden - b.orden)
                .map((opcion) => (
                  <div key={opcion.id} className="option-group">
                    <label>{opcion.nombre}:</label>
                    <div
                      className={
                        opcion.nombre.toLowerCase().includes("color") ||
                        opcion.nombre.toLowerCase().includes("variedad")
                          ? "color-options"
                          : "size-options"
                      }
                    >
                      {opcion.valores.map((valor) => {
                        const hasColor = valor.metadata?.color
                        const hasImage = valor.metadata?.imagen

                        if (hasColor) {
                          return (
                            <button
                              key={valor.id}
                              className={`color-sphere-btn ${valor.seleccionado ? "active" : ""}`}
                              onClick={() => handleOptionChange(valor)}
                              disabled={changingVariant}
                              title={valor.valor}
                            >
                              <span
                                className="color-sphere"
                                style={{
                                  background: `linear-gradient(135deg, ${valor.metadata.color} 0%, ${valor.metadata.color}dd 100%)`,
                                  boxShadow: valor.seleccionado
                                    ? `0 0 0 3px ${valor.metadata.color}33, 0 4px 12px ${valor.metadata.color}66`
                                    : `0 2px 8px ${valor.metadata.color}44`,
                                }}
                              />
                              <span className="color-label">{valor.valor}</span>
                            </button>
                          )
                        } else if (hasImage) {
                          return (
                            <button
                              key={valor.id}
                              className={`size-btn ${valor.seleccionado ? "active" : ""}`}
                              onClick={() => handleOptionChange(valor)}
                              disabled={changingVariant}
                            >
                              <img
                                src={valor.metadata.imagen || "/placeholder.svg"}
                                alt={valor.valor}
                                style={{ width: "20px", height: "20px", objectFit: "contain" }}
                                onError={(e) => {
                                  e.currentTarget.style.display = "none"
                                }}
                              />
                              <span>{valor.valor}</span>
                            </button>
                          )
                        } else {
                          return (
                            <button
                              key={valor.id}
                              className={`size-btn ${valor.seleccionado ? "active" : ""}`}
                              onClick={() => handleOptionChange(valor)}
                              disabled={changingVariant}
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

        {showTabs && (
          <div className="product-tabs">
            {hasPropiedades && hasUsos ? (
              <>
                <div className="tab-list">
                  <button
                    className={`tab-btn ${activeTab === "propiedades" ? "active" : ""}`}
                    onClick={() => setActiveTab("propiedades")}
                  >
                    Propiedades
                  </button>
                  <button
                    className={`tab-btn ${activeTab === "usos" ? "active" : ""}`}
                    onClick={() => setActiveTab("usos")}
                  >
                    Usos Recomendados
                  </button>
                </div>
                <div className="tab-panel">
                  {activeTab === "propiedades" && (
                    <ul>
                      {product.propiedades?.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  )}
                  {activeTab === "usos" && (
                    <ul>
                      {product.usosRecomendados?.map((u, i) => (
                        <li key={i}>{u}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <div className="single-tab-content">
                <h3 className="single-tab-title">{hasPropiedades ? "Propiedades" : "Usos Recomendados"}</h3>
                <ul>
                  {hasPropiedades
                    ? product.propiedades?.map((p, i) => <li key={i}>{p}</li>)
                    : product.usosRecomendados?.map((u, i) => <li key={i}>{u}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetailPage
