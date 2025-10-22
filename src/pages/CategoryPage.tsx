import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import productService, { Product } from '../services/productService';
import ProductCard from '../components/ProductCard';
import CategorySidebar, { CategoryItem } from '../components/CategorySidebar';
import { useApp } from '../contexts/AppContext';

const CategoryPage: React.FC<{ categoryId?: string }> = ({ categoryId }) => {
  // 🎯 Obtener categorías y addToCart del contexto
  const { addToCart, categories } = useApp();
  
  // Estados locales para la página de categoría
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('default');
  const [filters, setFilters] = useState<{ 
    priceMin?: number; 
    priceMax?: number; 
    featured?: boolean; 
    inStock?: boolean; 
    onSale?: boolean; 
  }>({});
  
  const params = useParams();
  const navigate = useNavigate();

  // Determinar el ID efectivo de la categoría según la ruta
  const effectiveCategoryId = useMemo(() => {
    if (categoryId && categoryId.length > 0) return categoryId;
    if (params.categoriaSlug) return params.categoriaSlug;
    if (params.subcategoriaSlug) {
      // Cuando estamos en /catalogo/:subcategoriaSlug, inferir categoría base desde subcategoría
      // 🎯 Usar categorías del contexto en lugar de llamar al servicio
      const found = categories.find(c => 
        c.subcategories?.some(s => s.id === params.subcategoriaSlug)
      );
      return found?.id || '';
    }
    return '';
  }, [categoryId, params.categoriaSlug, params.subcategoriaSlug, categories]);

  // 🎯 Obtener la categoría actual directamente del contexto
  const category = useMemo(() => {
    return categories.find(c => c.id === effectiveCategoryId) || null;
  }, [categories, effectiveCategoryId]);

  // 🎯 Obtener subcategorías directamente de la categoría (ya vienen en el array)
  const subcategories = useMemo(() => {
    return category?.subcategories || [];
  }, [category]);

  // Cargar productos cuando cambia la categoría o filtros
  useEffect(() => {
    setSelectedSubcategory(null);
    loadProducts(effectiveCategoryId, null, sortBy);
  }, [effectiveCategoryId]);

  // Recargar productos cuando cambian los filtros o subcategoría
  useEffect(() => {
    loadProducts(effectiveCategoryId, selectedSubcategory, sortBy);
  }, [effectiveCategoryId, selectedSubcategory, sortBy, filters]);

  // Cargar y filtrar productos
  const loadProducts = (catId: string, subcat: string | null, sort: string) => {
    let categoryProducts = productService.getProductsByCategory(catId, subcat || undefined);
    
    // Aplicar filtros
    if (filters.priceMin !== undefined) {
      categoryProducts = categoryProducts.filter(p => p.price >= (filters.priceMin as number));
    }
    if (filters.priceMax !== undefined) {
      categoryProducts = categoryProducts.filter(p => p.price <= (filters.priceMax as number));
    }
    if (filters.featured) {
      categoryProducts = categoryProducts.filter(p => p.featured);
    }
    if (filters.inStock) {
      categoryProducts = categoryProducts.filter(p => p.stock > 0);
    }
    if (filters.onSale) {
      categoryProducts = categoryProducts.filter(p => p.originalPrice > 0 && p.originalPrice > p.price);
    }

    // Aplicar ordenamiento
    if (sort === 'price-asc') {
      categoryProducts = [...categoryProducts].sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      categoryProducts = [...categoryProducts].sort((a, b) => b.price - a.price);
    } else if (sort === 'name') {
      categoryProducts = [...categoryProducts].sort((a, b) => a.name.localeCompare(b.name));
    }

    setProducts(categoryProducts);
  };

  const handleProductClick = (productId: number) => {
    navigate(`/producto/${productId}`);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart(product, quantity, product.sizes[0], product.colors[0]);
  };

  const handleSubcategoryClick = (subcategoryId: string | null) => {
    setSelectedSubcategory(subcategoryId);
    if (subcategoryId) {
      navigate(`/catalogo/${subcategoryId}`);
    } else if (effectiveCategoryId) {
      navigate(`/${effectiveCategoryId}`);
    }
  };

  const handleCategoryTabClick = (catId: string) => {
    // Resetear subcategoría seleccionada al cambiar de categoría
    setSelectedSubcategory(null);
    navigate(`/${catId}`);
  };

  // Si no se encuentra la categoría, mostrar mensaje
  if (!category) {
    return <div className="container"><p>Categoría no encontrada</p></div>;
  }

  return (
    <div className="category-page">
      {/* Hero de la categoría */}
      <div className="category-hero" style={{ backgroundImage: `url(${category.image})` }}>
        <div className="category-hero-content">
          <h1>{category.name}</h1>
          <p>{category.description}</p>
        </div>
      </div>

      <div className="container cv-container-with-sidebar">
        <div className="category-layout" style={{ gridTemplateColumns: subcategories.length > 0 ? '260px 1fr' : '1fr' }}>
          {/* Sidebar con categorías y subcategorías */}
          {(subcategories.length > 0 || categories.length > 0) && (
            <aside className="category-sidebar">
              <CategorySidebar
                categories={categories.map((c) => ({
                  id: c.id,
                  name: c.name,
                  count: productService.getProductsByCategory(c.id).length,
                  // 🎯 Usar directamente las subcategorías que ya vienen en el array
                  subCategories: (c.subcategories || []).map((s) => ({
                    id: s.id,
                    name: s.name,
                    count: productService.getProductsByCategory(c.id, s.id).length,
                  }))
                })) as CategoryItem[]}
                selectedCategory={effectiveCategoryId}
                selectedSubCategory={selectedSubcategory || undefined}
                onCategorySelect={(catId) => handleCategoryTabClick(catId)}
                onSubCategorySelect={(_catId, subId) => handleSubcategoryClick(subId)}
                onApplyFilters={(f) => { 
                  setFilters(f); 
                }}
              />
            </aside>
          )}

          {/* Contenido principal con productos */}
          <div className="category-main-content">
            <div className="category-toolbar">
              <div className="product-count">
                {products.length} {products.length === 1 ? 'producto' : 'productos'}
              </div>
              <div className="sort-controls">
                <label>Ordenar por:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="default">Predeterminado</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="name">Nombre A-Z</option>
                </select>
              </div>
            </div>

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
                <p>No hay productos disponibles en esta categoría.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;