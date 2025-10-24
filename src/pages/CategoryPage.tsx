import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getByCategoria } from '../services/productos.service';
import ProductCard from '../components/ProductCard';
import CategorySidebar, { CategoryItem } from '../components/CategorySidebar';
import { useApp } from '../contexts/AppContext';
import { Product } from '../interfaces/Productos.interface';

const CategoryPage: React.FC<{ categoryId?: string }> = ({ categoryId }) => {
  const { addToCart, categories } = useApp();
  
  // Estados para productos y paginación
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]); // Todos los productos sin filtrar
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categoryInfo, setCategoryInfo] = useState<any>(null);
  
  // Estados de filtros y ordenamiento
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
  
  const params = useParams();
  const navigate = useNavigate();

  // Determinar el slug efectivo según la ruta
  const effectiveSlug = useMemo(() => {
    if (categoryId && categoryId.length > 0) return categoryId;
    if (params.categoriaSlug) return params.categoriaSlug;
    if (params.subcategoriaSlug) return params.subcategoriaSlug;
    return '';
  }, [categoryId, params.categoriaSlug, params.subcategoriaSlug]);

  // Obtener la categoría del contexto
  const category = useMemo(() => {
    const foundInMain = categories.find(c => c.id === effectiveSlug);
    if (foundInMain) return foundInMain;
    
    // Buscar en subcategorías
    for (const cat of categories) {
      const foundSub = cat.subcategories?.find((s:any) => s.id === effectiveSlug);
      if (foundSub) {
        return {
          ...foundSub,
          parentCategory: cat
        };
      }
    }
    return null;
  }, [categories, effectiveSlug]);

  // Obtener subcategorías
  const subcategories = useMemo(() => {
    if (category?.parentCategory) {
      // Si estamos en una subcategoría, mostrar las hermanas
      return category.parentCategory.subcategories || [];
    }
    // Si es categoría principal, mostrar sus subcategorías
    return category?.subcategories || [];
  }, [category]);

  // Cargar productos desde el API
  const loadProductsFromAPI = async (slug: string) => {
    if (!slug) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Usar limit alto para obtener todos los productos de la categoría
      const response = await getByCategoria(slug, 1, 999);
      
      if (response.success) {
        setCategoryInfo(response.categoria);
        setAllProducts(response.productos);
        setProducts(response.productos);
      } else {
        setError('No se pudieron cargar los productos');
        setAllProducts([]);
        setProducts([]);
      }
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError('Error al cargar los productos. Por favor, intenta de nuevo.');
      setAllProducts([]);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Aplicar filtros y ordenamiento localmente
  const applyFiltersAndSort = () => {
    let filtered = [...allProducts];
    
    // Aplicar filtros de precio
    if (filters.priceMin !== undefined) {
      filtered = filtered.filter(p => p.price >= (filters.priceMin as number));
    }
    if (filters.priceMax !== undefined) {
      filtered = filtered.filter(p => p.price <= (filters.priceMax as number));
    }
    
    // Aplicar filtros booleanos
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

    // Aplicar ordenamiento
    if (sortBy === 'price-asc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setProducts(filtered);
  };

  // Cargar productos cuando cambia el slug
  useEffect(() => {
    setSelectedSubcategory(null);
    setFilters({});
    setSortBy('default');
    loadProductsFromAPI(effectiveSlug);
  }, [effectiveSlug]);

  // Aplicar filtros cuando cambian
  useEffect(() => {
    applyFiltersAndSort();
  }, [filters, sortBy, allProducts]);

  const handleProductClick = (product: Product) => {
    navigate(`/producto/${product.slug}`);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart(product, quantity, 'presentacion', 'variedad');
  };

  const handleSubcategoryClick = (subcategoryId: string | null) => {
    setSelectedSubcategory(subcategoryId);
    if (subcategoryId) {
      navigate(`/catalogo/${subcategoryId}`);
    } else if (category?.parentCategory) {
      navigate(`/${category.parentCategory.id}`);
    } else if (effectiveSlug) {
      navigate(`/${effectiveSlug}`);
    }
  };

  const handleCategoryTabClick = (catId: string) => {
    setSelectedSubcategory(null);
    navigate(`/${catId}`);
  };

  // Calcular contadores para el sidebar
  const categoriesWithCounts = useMemo(() => {
    return categories.map((c) => ({
      id: c.id,
      name: c.name,
      count: c.count, // Podrías calcular esto si necesitas
      subCategories: (c.subcategories || []).map((s:any) => ({
        id: s.id,
        name: s.name,
        count: s.count
      }))
    })) as CategoryItem[];
  }, [categories]);

  // Si hay error
  if (error) {
    return (
      <div className="container">
        <div className="error-state">
          <p>{error}</p>
          <button onClick={() => loadProductsFromAPI(effectiveSlug)}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Si no se encuentra la categoría
  if (!loading && !category) {
    return (
      <div className="container">
        <p>Categoría no encontrada</p>
      </div>
    );
  }

  return (
    <div className="category-page">
      {/* Hero de la categoría */}
   

      <div className="container cv-container-with-sidebar">
        <div 
          className="category-layout" 
          style={{ gridTemplateColumns: subcategories.length > 0 ? '260px 1fr' : '1fr' }}
        >
          {/* Sidebar con categorías y subcategorías */}
          {(subcategories.length > 0 || categories.length > 0) && (
            <aside className="category-sidebar">
              <CategorySidebar
                categories={categoriesWithCounts}
                selectedCategory={category?.parentCategory?.id || effectiveSlug}
                selectedSubCategory={selectedSubcategory || undefined}
                onCategorySelect={(catId) => handleCategoryTabClick(catId)}
                onSubCategorySelect={(_catId, subId) => handleSubcategoryClick(subId)}
                onApplyFilters={(f) => setFilters(f)}
              />
            </aside>
          )}

          {/* Contenido principal con productos */}
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
                <p>Cargando productos...</p>
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

export default CategoryPage;