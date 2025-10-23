import type React from "react"
import { useEffect, useState } from "react";
import bannerService, { type Banner } from "../services/BannerService"
import ProductCarousel from "../components/ProductCarousel"
import Newsletter from "../components/Newsletter"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useApp } from "../contexts/AppContext"
import { useNavigate } from "react-router-dom" 
import { getByCategoria, getDestacados, getNovedades  } from "../services/productos.service"
import { Product } from "../interfaces/Productos.interface";
const HomePage: React.FC = () => {
  const { addToCart, categories } = useApp()
  
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [newProducts, setNewProducts] = useState<Product[]>([])
  const [categoryProducts, setCategoryProducts] = useState<Record<string, Product[]>>({})
  const [banners, setBanners] = useState<Banner[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)
  
  const navigate = useNavigate()

  // Cargar productos del backend al montar
  useEffect(() => {
    loadHomeData()
  }, [categories])

  const loadHomeData = async () => {
    try {
      setLoading(true)

      // Cargar destacados y novedades en paralelo
      const [destacadosRes, novedadesRes] = await Promise.all([
        getDestacados(),
        getNovedades()
      ])

      setFeaturedProducts(destacadosRes.productos)
      setNewProducts(novedadesRes.productos)

      // Cargar productos por cada categoría
      if (categories.length > 0) {
        const categoriesPromises = categories.map(cat => 
          getByCategoria(cat.id)
        )
        const categoriesResults = await Promise.all(categoriesPromises)

        const catProducts: Record<string, Product[]> = {}
        categoriesResults.forEach((res, index) => {
          catProducts[categories[index].id] = res.productos
        })
        setCategoryProducts(catProducts)
      }

      // Cargar banners (del servicio local)
      setBanners(bannerService.getBanners())

    } catch (error) {
      console.error('Error al cargar datos del home:', error)
    } finally {
      setLoading(false)
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
    // Adaptar el producto del backend al formato del contexto
    const productWithSizes = {
      ...product,
      sizes: ['Único'],
      colors: ['Único']
    }
    addToCart(productWithSizes as any, quantity, 'Único', 'Único')
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

  if (loading) {
    return (
      <div className="home-page">
        <div className="container" style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Cargando productos...</p>
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

      {/* Carrusel de Novedades */}
      {newProducts.length > 0 && (
        <ProductCarousel
          title="Novedades"
          products={newProducts as any}
          slideBy={1}
          autoPlay
          autoPlayIntervalMs={4500}
          onProductClick={handleProductClick}
          onAddToCart={handleAddToCart}
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

      {/* Carrusel de Destacados */}
      {featuredProducts.length > 0 && (
        <ProductCarousel
          title="Destacados"
          products={featuredProducts as any}
          slideBy={1}
          onProductClick={handleProductClick}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Carruseles por Categoría - uno para cada categoría con su banner */}
      {categories.map((cat) => {
        const products = categoryProducts[cat.id] || []
        if (products.length === 0) return null

        return (
          <div key={cat.id}>
            {/* Banner de la categoría si existe */}
            {cat.bannerUrl && (
              <section className="category-banner">
                <div className="banner-image-container">
                  <img 
                    src={cat.bannerUrl} 
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
              products={products as any}
              slideBy={1}
              onProductClick={handleProductClick}
              onAddToCart={handleAddToCart}
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