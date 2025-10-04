import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Api, ProductDto as Product, CategoryDto as Category } from '../lib/api';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get('categoria');

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categorySlug);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setSelectedCategory(categorySlug);
  }, [categorySlug]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchTerm]);

  async function fetchCategories() {
    const data = await Api.listCategories();
    setCategories(data);
  }

  async function fetchProducts() {
    setLoading(true);
    const data = await Api.listProducts({
      category_slug: selectedCategory || undefined,
      search: searchTerm || undefined,
    });
    setProducts(data);
    setLoading(false);
  }

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1>Nuestros Productos</h1>
        </div>

        <div className="products-layout">
          <aside className="filters-sidebar">
            <div className="filter-section">
              <h3>Búsqueda</h3>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-section">
              <h3>Categorías</h3>
              <ul className="category-filter">
                <li>
                  <button
                    className={!selectedCategory ? 'active' : ''}
                    onClick={() => setSelectedCategory(null)}
                  >
                    Todas las categorías
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      className={selectedCategory === category.slug ? 'active' : ''}
                      onClick={() => setSelectedCategory(category.slug)}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="products-main">
            {loading ? (
              <div className="loading">Cargando productos...</div>
            ) : products.length === 0 ? (
              <div className="no-products">No se encontraron productos</div>
            ) : (
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
