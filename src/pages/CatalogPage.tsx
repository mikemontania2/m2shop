import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getByCategoria } from '../services/productos.service';
import ProductCard from '../components/ProductCard';
import CategorySidebar, { CategoryItem } from '../components/CategorySidebar';
import { useApp } from '../contexts/AppContext';
import { Product } from '../interfaces/Productos.interface';

const CatalogPage: React.FC = () => {
  const { addToCart, categories } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Estados
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Filtros y ordenamiento
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('default');
  const [filters, setFilters] = useState<{ 
    priceMin?: number; 
    priceMax?: number; 
    featured?: boolean;
    news?: boolean;
    inStock?: boolean; 
    onSale?: boolean; 
  }>({});

  // Obtener categoría del query string
  const categoryFromQuery = searchParams.get('categoria');
  const subcategoryFromQuery = searchParams.get('subcategoria');

  // Cargar todos los productos de todas las categorías
  const loadAllProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const allProductsList: Product[] = [];
      
      // Cargar productos de cada categoría
      for (const category of categories) {
        try {
          const response = await getByCategoria(category.id, 1, 999);
          if (response.success && response.productos) {
            allProductsList.push(...response.productos);
          }
        } catch (err) {
          console.error(`Error al cargar categoría ${category.id}:`, err);
        }
      }
      
      setAllProducts(allProductsList);
      setProducts(allProductsList);
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError('Error al cargar el catálogo. Por favor, intenta de nuevo.');
      setAllProducts([]);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Aplicar filtros localmente
  const applyFiltersAndSort = () => {
    let filtered = [...allProducts];
    
    // Filtrar por categoría seleccionada
    if (selectedCategory) {
      // Obtener la categoría completa para verificar sus subcategorías
      const category = categories.find(c => c.id === selectedCategory);
      
      if (selectedSubcategory) {
        // Filtrar por subcategoría específica
        // Como el API no retorna categorySlug, podríamos necesitar agregarlo
        // Por ahora filtraremos solo si el producto pertenece a esa subcategoría
        filtered = filtered.filter(p => {
          // Aquí necesitarías una forma de identificar a qué subcategoría pertenece
          // Esto depende de cómo esté estructurada tu respuesta del API
          return true; // Placeholder
        });
      } else {
        // Filtrar por categoría (incluyendo todas sus subcategorías)
        // Similar al caso anterior, necesitarías identificar la categoría del producto
      }
    }
    
    // Filtros de precio
    if (filters.priceMin !== undefined) {
      filtered = filtered.filter(p => p.price >= (filters.priceMin as number));
    }
    if (filters.priceMax !== undefined) {
      filtered = filtered.filter(p => p.price <= (filters.priceMax as number));
    }
    
    // Filtros booleanos
    if (filters.featured) {
      filtered = filtered.filter(p => p.featured);
    }
    if (filters.news) {
      filtered = filtered.filter(p => p.news);
    }
    if (filters.inStock) {
      filtered = filtered.filter(p => p.stock > 0);
    }
    if (filters.onSale) {
      filtered = filtered.filter(p => p.originalPrice > 0 && p.originalPrice > p.price);
    }

    // Ordenamiento
    if (sortBy === 'price-asc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setProducts(filtered);
  };

  // Cargar productos inicialmente
  useEffect(() => {
    loadAllProducts();
  }, [categories]);

  // Actualizar filtros desde query string
  useEffect(() => {
    if (categoryFromQuery) {
      setSelectedCategory(categoryFromQuery);
    }
    if (subcategoryFromQuery) {
      setSelectedSubcategory(subcategoryFromQuery);
    }
  }, [categoryFromQuery, subcategoryFromQuery]);

  // Aplicar filtros cuando cambien
  useEffect(() => {
    applyFiltersAndSort();
  }, [filters, sortBy, selectedCategory, selectedSubcategory, allProducts]);

  const handleProductClick = (product: Product) => {
    navigate(`/producto/${product.slug}`);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart(product, quantity, 'presentacion', 'variedad');
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
    navigate(`/catalogo?categoria=${categoryId}`);
  };

  const handleSubcategorySelect = (categoryId: string, subcategoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(subcategoryId);
    navigate(`/catalogo?categoria=${categoryId}&subcategoria=${subcategoryId}`);
  };

  // Preparar categorías con contadores
  const categoriesWithCounts = useMemo(() => {
    return categories.map((c) => ({
      id: c.id,
      name: c.name,
      count:  c.count,
      subCategories: (c.subcategories || []).map((s:any) => ({
        id: s.id,
        name: s.name,
        count: s.count
      }))
    })) as CategoryItem[];
  }, [categories, allProducts]);

  if (error) {
    return (
      <div className="container">
        <div className="error-state">
          <p>{error}</p>
          <button onClick={loadAllProducts}>Reintentar</button>
        </div>
      </div>
    );
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
        <div className="category-layout" style={{ gridTemplateColumns: '260px 1fr' }}>
          {/* Sidebar */}
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

          {/* Contenido principal */}
          <div className="category-main-content">
            <div className="category-toolbar">
              <div className="product-count">
                {loading ? (
                  'Cargando...'
                ) : (
                  <>
                    {products.length} {products.length === 1 ? 'producto' : 'productos'}
                  </>
                )}
              </div>
              <div className="sort-controls">
                <label>Ordenar por:</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  disabled={loading}
                >
                  <option value="default">Predeterminado</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="name">Nombre A-Z</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="loading-state">
                <p>Cargando catálogo...</p>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;