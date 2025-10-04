import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Api, ProductDto as Product, CategoryDto as Category } from '../lib/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      title: 'Productos de Calidad',
      subtitle: 'Para tu hogar y familia',
      image: 'https://images.pexels.com/photos/4107278/pexels-photo-4107278.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    {
      title: 'Higiene Personal',
      subtitle: 'Cuida de ti y los tuyos',
      image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    {
      title: 'Limpieza del Hogar',
      subtitle: 'Un hogar limpio, una familia feliz',
      image: 'https://images.pexels.com/photos/4107282/pexels-photo-4107282.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
  ];

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  async function fetchData() {
    const [featured, news, categoriesList] = await Promise.all([
      Api.listProducts({ is_featured: true }),
      Api.listProducts({ is_new: true }),
      Api.listCategories(),
    ]);
    setFeaturedProducts(featured.slice(0, 4));
    setNewProducts(news.slice(0, 4));
    setCategories(categoriesList);
  }

  return (
    <div className="home">
      <div className="container" style={{ padding: '10px 0' }}>
        <div className="header-features" style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'center', fontSize: 14 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/icons/truck.png" alt="Envíos" width={20} height={20} /> Envíos a todo el país
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/icons/credit-card.png" alt="Pagos" width={20} height={20} /> Pagos seguros
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/icons/support.png" alt="Soporte" width={20} height={20} /> Soporte 24/7
          </span>
        </div>
      </div>
      <section className="hero-carousel">
        <div className="carousel">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="carousel-content">
                <h2>{banner.title}</h2>
                <p>{banner.subtitle}</p>
                <Link to="/productos" className="btn btn-primary">
                  Ver Productos
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-indicators">
          {banners.map((_, index) => (
            <button
              key={index}
              className={index === currentSlide ? 'active' : ''}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Nuestras Categorías</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/productos?categoria=${category.slug}`}
                className="category-card"
              >
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <h2 className="section-title">Productos Destacados</h2>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <h2 className="section-title">Novedades</h2>
          <div className="products-grid">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
