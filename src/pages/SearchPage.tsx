import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productService, { Product } from '../services/productService';
import ProductCard from '../components/ProductCard';
import { useApp } from '../contexts/AppContext';

const SearchPage: React.FC = () => {
  const { addToCart } = useApp();
  const [products, setProducts] = useState<Product[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const searchQuery = searchParams.get('q') || '';

  useEffect(() => {
    const results = searchQuery ? productService.searchProducts(searchQuery) : productService.getProducts();
    setProducts(results);
  }, [searchQuery]);

  const handleProductClick = (product: Product) => {
    navigate(`/producto/${product.slug}`);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart(product, quantity, product.sizes[0], product.colors[0]);
  };

  return (
    <div className="search-page">
      <div className="container">
        <h1>Resultados de búsqueda para "{searchQuery}"</h1>
        <p className="search-count">
          {products.length} {products.length === 1 ? 'producto encontrado' : 'productos encontrados'}
        </p>

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
            <button className="btn-primary" onClick={() => navigate('/')}>Volver al Inicio</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
