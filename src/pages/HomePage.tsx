"use client"

import type React from "react"
import { useEffect, useState } from "react"
import bannerService, { type Banner } from "../services/BannerService"
import ProductCarousel from "../components/ProductCarousel"
import Newsletter from "../components/Newsletter"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useApp } from "../contexts/AppContext"
import { useNavigate } from "react-router-dom"
import { getByCategoria, getDestacados, getNovedades } from "../services/productos.service"
import type { Product } from "../interfaces/Productos.interface"
import LoadingSpinner from "../components/LoadingSpinner"

// ⭐ Interface para el estado de paginación
interface PaginationState {
  currentPage: number
  totalPages: number
  isLoading: boolean
}

const HomePage: React.FC = () => {
  const { addToCart, categories } = useApp()

  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [newProducts, setNewProducts] = useState<Product[]>([])
  const [categoryProducts, setCategoryProducts] = useState<Record<string, Product[]>>({})

  // ⭐ Estados de paginación
  const [featuredPagination, setFeaturedPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
  })
  const [newPagination, setNewPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
  })
  const [categoryPagination, setCategoryPagination] = useState<Record<string, PaginationState>>({})

  const [banners, setBanners] = useState<Banner[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  // Cargar productos del backend al montar (SOLO PRIMERA PÁGINA)
  useEffect(() => {
    loadHomeData()
  }, [categories])

  const loadHomeData = async () => {
    try {
      setLoading(true)

      // ⭐ Cargar SOLO la primera página (12 items)
      const [destacadosRes, novedadesRes] = await Promise.all([getDestacados(1, 12), getNovedades(1, 12)])

      setFeaturedProducts(destacadosRes.productos)
      setFeaturedPagination({
        currentPage: 1,
        totalPages: destacadosRes.pagination.pages,
        isLoading: false,
      })

      setNewProducts(novedadesRes.productos)
      setNewPagination({
        currentPage: 1,
        totalPages: novedadesRes.pagination.pages,
        isLoading: false,
      })

      // ⭐ Cargar solo primera página de cada categoría
      if (categories.length > 0) {
        const categoriesPromises = categories.map((cat) => getByCategoria(cat.id, 1, 12))
        const categoriesResults = await Promise.all(categoriesPromises)

        const catProducts: Record<string, Product[]> = {}
        const catPag: Record<string, PaginationState> = {}

        categoriesResults.forEach((res, index) => {
          const catId = categories[index].id
          catProducts[catId] = res.productos
          catPag[catId] = {
            currentPage: 1,
            totalPages: res.pagination.pages,
            isLoading: false,
          }
        })

        setCategoryProducts(catProducts)
        setCategoryPagination(catPag)
      }

      // Cargar banners
      setBanners(bannerService.getBanners())
    } catch (error) {
      console.error("Error al cargar datos del home:", error)
    } finally {
      setLoading(false)
    }
  }

  // ⭐ NUEVO: Cargar más destacados
  const loadMoreFeatured = async () => {
    const { currentPage, totalPages, isLoading } = featuredPagination

    if (isLoading || currentPage >= totalPages) {
      console.log("⏸️ Destacados: Ya está cargando o no hay más páginas")
      return
    }

    try {
      console.log(`📥 Destacados: Cargando página ${currentPage + 1} de ${totalPages}`)
      setFeaturedPagination((prev) => ({ ...prev, isLoading: true }))

      const nextPage = currentPage + 1
      const response = await getDestacados(nextPage, 12)

      setFeaturedProducts((prev) => [...prev, ...response.productos])
      setFeaturedPagination({
        currentPage: nextPage,
        totalPages: response.pagination.pages,
        isLoading: false,
      })

      console.log(`✅ Destacados: Cargados ${response.productos.length} productos más`)
    } catch (error) {
      console.error("❌ Error cargando más destacados:", error)
      setFeaturedPagination((prev) => ({ ...prev, isLoading: false }))
    }
  }

  // ⭐ NUEVO: Cargar más novedades
  const loadMoreNew = async () => {
    const { currentPage, totalPages, isLoading } = newPagination

    if (isLoading || currentPage >= totalPages) {
      console.log("⏸️ Novedades: Ya está cargando o no hay más páginas")
      return
    }

    try {
      console.log(`📥 Novedades: Cargando página ${currentPage + 1} de ${totalPages}`)
      setNewPagination((prev) => ({ ...prev, isLoading: true }))

      const nextPage = currentPage + 1
      const response = await getNovedades(nextPage, 12)

      setNewProducts((prev) => [...prev, ...response.productos])
      setNewPagination({
        currentPage: nextPage,
        totalPages: response.pagination.pages,
        isLoading: false,
      })

      console.log(`✅ Novedades: Cargados ${response.productos.length} productos más`)
    } catch (error) {
      console.error("❌ Error cargando más novedades:", error)
      setNewPagination((prev) => ({ ...prev, isLoading: false }))
    }
  }

  // ⭐ NUEVO: Cargar más productos de categoría
  const loadMoreCategory = async (categoryId: string) => {
    const pagination = categoryPagination[categoryId]

    if (!pagination || pagination.isLoading || pagination.currentPage >= pagination.totalPages) {
      console.log(`⏸️ Categoría ${categoryId}: Ya está cargando o no hay más páginas`)
      return
    }

    try {
      console.log(
        `📥 Categoría ${categoryId}: Cargando página ${pagination.currentPage + 1} de ${pagination.totalPages}`,
      )

      setCategoryPagination((prev) => ({
        ...prev,
        [categoryId]: { ...prev[categoryId], isLoading: true },
      }))

      const nextPage = pagination.currentPage + 1
      const response = await getByCategoria(categoryId, nextPage, 12)

      setCategoryProducts((prev) => ({
        ...prev,
        [categoryId]: [...(prev[categoryId] || []), ...response.productos],
      }))

      setCategoryPagination((prev) => ({
        ...prev,
        [categoryId]: {
          currentPage: nextPage,
          totalPages: response.pagination.pages,
          isLoading: false,
        },
      }))

      console.log(`✅ Categoría ${categoryId}: Cargados ${response.productos.length} productos más`)
    } catch (error) {
      console.error(`❌ Error cargando más productos de ${categoryId}:`, error)
      setCategoryPagination((prev) => ({
        ...prev,
        [categoryId]: { ...prev[categoryId], isLoading: false },
      }))
    }
  }

  // Auto-play del slider de banners
  useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [banners])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const handleAddToCart = (product: Product, quantity: number) => {
    const productWithSizes = {
      ...product,
      sizes: ["Único"],
      colors: ["Único"],
    }
    addToCart(productWithSizes as any, quantity, "Único", "Único")
  }

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/${categoryId}`)
  }

  const handleProductClick = (productId: number) => {
    const product = [...featuredProducts, ...newProducts, ...Object.values(categoryProducts).flat()].find(
      (p) => p.id === productId,
    )
    if (product) {
      navigate(`/producto/${product.slug}`)
    }
  }

  const handleBannerClick = (url: string) => {
    navigate(url)
  }

  if (loading) {
    return (
      <div className="home-page">
        <div className="container" style={{ textAlign: "center", padding: "3rem" }}>
          <LoadingSpinner message="Cargando productos..." />
        </div>
      </div>
    )
  }

  return (
    <div className="home-page">
      {/* Hero Slider - Banners principales */}
      <section className="hero-slider">
        <div className="slider-container">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? "active" : ""}`}
              style={{ backgroundImage: `url(${banner.image})` }}
              onClick={() => handleBannerClick(banner.url)}
            ></div>
          ))}
        </div>
        <button className="slider-btn prev" onClick={prevSlide} aria-label="Banner anterior">
          <ChevronLeft size={30} />
        </button>
        <button className="slider-btn next" onClick={nextSlide} aria-label="Siguiente banner">
          <ChevronRight size={30} />
        </button>
        <div className="slider-dots">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ir al banner ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Sección de Categorías */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Categorías</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <div key={category.id} className="category-card" onClick={() => handleCategoryClick(category.id)}>
                <div className="category-image">
                  <img src={category.image || "/placeholder.svg"} alt={category.name} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⭐ Carrusel de Novedades CON LAZY LOADING */}
      {newProducts.length > 0 && (
        <ProductCarousel
          title="Novedades"
          products={newProducts}
          slideBy={1}
          autoPlay
          autoPlayIntervalMs={4500}
          onProductClick={handleProductClick}
          onAddToCart={handleAddToCart}
          onLoadMore={loadMoreNew}
          hasMore={newPagination.currentPage < newPagination.totalPages}
          isLoadingMore={newPagination.isLoading}
        />
      )}

      {/* Banner medio entre Novedades y Destacados */}
      <section className="mid-banner">
        <div className="banner-image-container">
          <img
            src="https://www.cavallaro.com.py/userfiles/images/banners/bannermedio1-12.png"
            alt="Banner promocional"
            className="banner-image"
          />
        </div>
      </section>

      {/* ⭐ Carrusel de Destacados CON LAZY LOADING */}
      {featuredProducts.length > 0 && (
        <ProductCarousel
          title="Destacados"
          products={featuredProducts}
          slideBy={1}
          onProductClick={handleProductClick}
          onAddToCart={handleAddToCart}
          onLoadMore={loadMoreFeatured}
          hasMore={featuredPagination.currentPage < featuredPagination.totalPages}
          isLoadingMore={featuredPagination.isLoading}
        />
      )}

      {/* ⭐ Carruseles por Categoría CON LAZY LOADING */}
      {categories.map((cat) => {
        const products = categoryProducts[cat.id] || []
        const pagination = categoryPagination[cat.id]
        if (products.length === 0) return null

        return (
          <div key={cat.id}>
            {/* Banner de la categoría si existe */}
            {cat.bannerUrl && (
              <section className="category-banner">
                <div className="banner-image-container">
                  <img
                    src={cat.bannerUrl || "/placeholder.svg"}
                    alt={`Banner ${cat.name}`}
                    className="banner-image"
                    onClick={() => handleCategoryClick(cat.id)}
                  />
                </div>
              </section>
            )}

            {/* Carrusel de productos de la categoría */}
            <ProductCarousel
              title={cat.name}
              products={products}
              slideBy={1}
              onProductClick={handleProductClick}
              onAddToCart={handleAddToCart}
              onLoadMore={() => loadMoreCategory(cat.id)}
              hasMore={pagination ? pagination.currentPage < pagination.totalPages : false}
              isLoadingMore={pagination?.isLoading || false}
            />
          </div>
        )
      })}

      {/* Sección de Promociones / Beneficios */}
      <section className="promo-section">
        <div className="container">
          <div className="promo-grid">
            <div className="promo-card">
              <h3>Envío Gratis</h3>
              <p>En compras superiores a Gs. 500.000</p>
            </div>
            <div className="promo-card">
              <h3>Pago Seguro</h3>
              <p>Garantía de seguridad en todas las transacciones</p>
            </div>
            <div className="promo-card">
              <h3>Devoluciones</h3>
              <p>30 días para cambios y devoluciones</p>
            </div>
            <div className="promo-card">
              <h3>Atención 24/7</h3>
              <p>Estamos para ayudarte cuando lo necesites</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  )
}

export default HomePage
