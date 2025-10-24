"use client"

import type React from "react"
import { useEffect, useState, useMemo } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { getByCategoria } from "../services/productos.service"
import ProductCard from "../components/ProductCard"
import CategorySidebar, { type CategoryItem } from "../components/CategorySidebar"
import { useApp } from "../contexts/AppContext"
import type { Product } from "../interfaces/Productos.interface"
import LoadingSpinner from "../components/LoadingSpinner"
// </CHANGE>

const CatalogPage: React.FC = () => {
  const { addToCart, categories } = useApp()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [products, setProducts] = useState<Product[]>([])
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<string>("default")
  const [filters, setFilters] = useState<{
    priceMin?: number
    priceMax?: number
    featured?: boolean
    news?: boolean
    inStock?: boolean
    onSale?: boolean
  }>({})

  const categoryFromQuery = searchParams.get("categoria")
  const subcategoryFromQuery = searchParams.get("subcategoria")

  const loadAllProducts = async () => {
    setLoading(true)
    setError(null)

    try {
      const allProductsList: Product[] = []

      for (const category of categories) {
        try {
          const response = await getByCategoria(category.id, 1, 999)
          if (response.success && response.productos) {
            allProductsList.push(...response.productos)
          }
        } catch (err) {
          console.error(`Error al cargar categoría ${category.id}:`, err)
        }
      }

      setAllProducts(allProductsList)
      setProducts(allProductsList)
    } catch (err) {
      console.error("Error al cargar productos:", err)
      setError("Error al cargar el catálogo. Por favor, intenta de nuevo.")
      setAllProducts([])
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const applyFiltersAndSort = () => {
    let filtered = [...allProducts]

    if (selectedCategory) {
      const category = categories.find((c) => c.id === selectedCategory)

      if (selectedSubcategory) {
        filtered = filtered.filter((p) => {
          return true
        })
      } else {
      }
    }

    if (filters.priceMin !== undefined) {
      filtered = filtered.filter((p) => p.price >= (filters.priceMin as number))
    }
    if (filters.priceMax !== undefined) {
      filtered = filtered.filter((p) => p.price <= (filters.priceMax as number))
    }

    if (filters.featured) {
      filtered = filtered.filter((p) => p.featured)
    }
    if (filters.news) {
      filtered = filtered.filter((p) => p.news)
    }
    if (filters.inStock) {
      filtered = filtered.filter((p) => p.stock > 0)
    }
    if (filters.onSale) {
      filtered = filtered.filter((p) => p.originalPrice > 0 && p.originalPrice > p.price)
    }

    if (sortBy === "price-asc") {
      filtered = filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-desc") {
      filtered = filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "name") {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    setProducts(filtered)
  }

  useEffect(() => {
    loadAllProducts()
  }, [categories])

  useEffect(() => {
    if (categoryFromQuery) {
      setSelectedCategory(categoryFromQuery)
    }
    if (subcategoryFromQuery) {
      setSelectedSubcategory(subcategoryFromQuery)
    }
  }, [categoryFromQuery, subcategoryFromQuery])

  useEffect(() => {
    applyFiltersAndSort()
  }, [filters, sortBy, selectedCategory, selectedSubcategory, allProducts])

  const handleProductClick = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      navigate(`/producto/${product.slug}`)
    }
  }
  // </CHANGE>

  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart(product, quantity, "presentacion", "variedad")
  }

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSelectedSubcategory(null)
    navigate(`/catalogo?categoria=${categoryId}`)
  }

  const handleSubcategorySelect = (categoryId: string, subcategoryId: string) => {
    setSelectedCategory(categoryId)
    setSelectedSubcategory(subcategoryId)
    navigate(`/catalogo?categoria=${categoryId}&subcategoria=${subcategoryId}`)
  }

  const categoriesWithCounts = useMemo(() => {
    return categories.map((c) => ({
      id: c.id,
      name: c.name,
      count: c.count,
      subCategories: (c.subcategories || []).map((s: any) => ({
        id: s.id,
        name: s.name,
        count: s.count,
      })),
    })) as CategoryItem[]
  }, [categories, allProducts])

  if (error) {
    return (
      <div className="container">
        <div className="error-state">
          <p>{error}</p>
          <button onClick={loadAllProducts}>Reintentar</button>
        </div>
      </div>
    )
  }

  return (
    <div className="catalog-page">
      <div className="catalog-hero">
        <div className="catalog-hero-content">
          <h1>Catálogo Completo</h1>
          <p>Explora todos nuestros productos</p>
        </div>
      </div>

      <div className="container cv-container-with-sidebar">
        <div className="category-layout" style={{ gridTemplateColumns: "260px 1fr" }}>
          <aside className="category-sidebar">
            <CategorySidebar
              categories={categoriesWithCounts}
              selectedCategory={selectedCategory || undefined}
              selectedSubCategory={selectedSubcategory || undefined}
              onCategorySelect={handleCategorySelect}
              onSubCategorySelect={handleSubcategorySelect}
              onApplyFilters={(f) => setFilters(f)}
            />
          </aside>

          <div className="category-main-content">
            <div className="category-toolbar">
              <div className="product-count">
                {loading ? (
                  "Cargando..."
                ) : (
                  <>
                    {products.length} {products.length === 1 ? "producto" : "productos"}
                  </>
                )}
              </div>
              <div className="sort-controls">
                <label>Ordenar por:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} disabled={loading}>
                  <option value="default">Predeterminado</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="name">Nombre A-Z</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="loading-state" style={{ padding: "3rem", textAlign: "center" }}>
                <LoadingSpinner message="Cargando catálogo..." />
              </div>
            ) : (
              <>
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

                {products.length === 0 && (
                  <div className="empty-state">
                    <p>No hay productos disponibles que coincidan con los filtros seleccionados.</p>
                  </div>
                )}
              </>
            )}
            {/* </CHANGE> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CatalogPage
