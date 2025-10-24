"use client"

import type React from "react"
import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { useApp } from "../contexts/AppContext"
import { searchProductos } from "../services/productos.service"
import type { Product } from "../interfaces/Productos.interface"
import LoadingSpinner from "../components/LoadingSpinner"
import "../styles/search.css"

const SearchPage: React.FC = () => {
  const { addToCart } = useApp()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search])
  const searchQuery = searchParams.get("q") || ""

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        setProducts([])
        return
      }

      setLoading(true)
      setError(null)

      try {
        const response = await searchProductos(searchQuery.trim(), 1, 999)
        if (response.success && response.productos) {
          setProducts(response.productos)
        } else {
          setProducts([])
        }
      } catch (err) {
        console.error("Error al buscar productos:", err)
        setError("Error al buscar productos. Por favor, intenta de nuevo.")
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [searchQuery])

  const handleProductClick = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      navigate(`/producto/${product.slug}`)
    }
  }

  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart(product, quantity, "presentacion", "variedad")
  }

  return (
    <div className="search-page">
      {loading && <LoadingSpinner />}

      <div className="container">
        <h1>Resultados de búsqueda para "{searchQuery}"</h1>
        <p className="search-count">
          {loading ? (
            "Buscando..."
          ) : (
            <>
              {products.length} {products.length === 1 ? "producto encontrado" : "productos encontrados"}
            </>
          )}
        </p>

        {error && (
          <div className="error-state">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {products.length > 0 ? (
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onProductClick={handleProductClick}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No se encontraron productos con tu búsqueda.</p>
                <button className="btn-primary" onClick={() => navigate("/")}>
                  Volver al Inicio
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default SearchPage
