"use client"

import type React from "react"
import { useEffect, useMemo, useState } from "react"
import productService, { type Product, type Category } from "../services/productService"
import bannerService, { type Banner } from "../services/BannerService"
import ProductCarousel from "../components/ProductCarousel"
import Newsletter from "../components/Newsletter"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useApp } from "../contexts/AppContext"
import { useNavigate } from "react-router-dom"

const HomePage: React.FC = () => {
  const { addToCart } = useApp()
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [newProducts, setNewProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [banners, setBanners] = useState<Banner[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const all = productService.getProducts()
    setFeaturedProducts(all.filter((p) => p.featured))
    setNewProducts([...all].sort((a, b) => b.id - a.id).slice(0, 10))
    setCategories(productService.getCategories())
    setBanners(bannerService.getBanners())
  }, [])

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
    addToCart(product, quantity, product.sizes[0], product.colors[0])
  }

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/${categoryId}`)
  }

  const handleProductClick = (productId: number) => {
    navigate(`/producto/${productId}`)
  }

  const handleBannerClick = (url: string) => {
    navigate(url)
  }

  const categorizedProducts = useMemo(() => {
    const byCat: Record<string, Product[]> = {}
    categories.forEach((c) => {
      byCat[c.id] = productService.getProductsByCategory(c.id).slice(0, 12)
    })
    return byCat
  }, [categories])

  return (
    <div className="home-page">
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
        <button className="slider-btn prev" onClick={prevSlide}>
          <ChevronLeft size={30} />
        </button>
        <button className="slider-btn next" onClick={nextSlide}>
          <ChevronRight size={30} />
        </button>
        <div className="slider-dots">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

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

      <ProductCarousel
        title="Novedades"
        products={newProducts}
        slideBy={1}
        autoPlay
        autoPlayIntervalMs={4500}
        onProductClick={handleProductClick}
        onAddToCart={handleAddToCart}
      />

      <ProductCarousel
        title="Destacados"
        products={featuredProducts}
        slideBy={1}
        onProductClick={handleProductClick}
        onAddToCart={handleAddToCart}
      />

      {/* Sliders por Categoría */}
      {categories.map((cat) => (
        <ProductCarousel
          key={cat.id}
          title={cat.name}
          products={categorizedProducts[cat.id] || []}
          slideBy={1}
          onProductClick={handleProductClick}
          onAddToCart={handleAddToCart}
        />
      ))}

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

      <Newsletter />
    </div>
  )
}

export default HomePage
