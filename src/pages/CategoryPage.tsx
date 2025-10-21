import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import productService, { Product, Subcategory, Category } from '../services/productService';
import ProductCard from '../components/ProductCard';
import CategorySidebar, { CategoryItem } from '../components/CategorySidebar';
import { useApp } from '../contexts/AppContext';

const CategoryPage: React.FC<{ categoryId?: string }> = ({ categoryId }) => {
  const { addToCart } = useApp();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<any>(null);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [subcategoryCounts, setSubcategoryCounts] = useState<Record<string, number>>({});
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [sortBy, setSortBy] = useState<string>('default');
  const [filters, setFilters] = useState<{ priceMin?: number; priceMax?: number; featured?: boolean; inStock?: boolean; onSale?: boolean; }>({});
  const params = useParams();
  const navigate = useNavigate();
  const effectiveCategoryId = useMemo(() => {
    if (categoryId && categoryId.length > 0) return categoryId;
    if (params.categoriaSlug) return params.categoriaSlug;
    if (params.subcategoriaSlug) {
      // When we are in /catalogo/:subcategoriaSlug, infer base category from subcategory
      const allCategories = productService.getCategories();
      const found = allCategories.find(c => c.subcategories.some(s => s.id === params.subcategoriaSlug));
      return found?.id || '';
    }
    return '';
  }, [categoryId, params.categoriaSlug, params.subcategoriaSlug]);

  useEffect(() => {
    const categoryData = productService.getCategoryById(effectiveCategoryId);
    setCategory(categoryData);

    const subcats = productService.getSubcategoriesByCategory(effectiveCategoryId);
    setSubcategories(subcats);

    setAllCategories(productService.getCategories());

    setSelectedSubcategory(null);
    loadProducts(effectiveCategoryId, null, sortBy);
  }, [effectiveCategoryId]);

  useEffect(() => {
    loadProducts(effectiveCategoryId, selectedSubcategory, sortBy);
  }, [effectiveCategoryId, selectedSubcategory, sortBy]);

  useEffect(() => {
    // Precompute product counts per subcategory for a nicer UI
    if (!effectiveCategoryId || subcategories.length === 0) {
      setSubcategoryCounts({});
      return;
    }
    const counts: Record<string, number> = {};
    subcategories.forEach((s) => {
      counts[s.id] = productService.getProductsByCategory(effectiveCategoryId, s.id).length;
    });
    setSubcategoryCounts(counts);
  }, [effectiveCategoryId, subcategories]);

  const loadProducts = (catId: string, subcat: string | null, sort: string) => {
    let categoryProducts = productService.getProductsByCategory(catId, subcat || undefined);
    // Apply filters
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
    // Reset selected subcategory when switching category
    setSelectedSubcategory(null);
    navigate(`/${catId}`);
  };

  if (!category) {
    return <div className="container"><p>Categoría no encontrada</p></div>;
  }

  return (
    <div className="category-page">
      <div className="category-hero" style={{ backgroundImage: `url(${category.image})` }}>
        <div className="category-hero-content">
          <h1>{category.name}</h1>
          <p>{category.description}</p>
        </div>
      </div>

      <div className="container cv-container-with-sidebar">
        <div className="category-layout" style={{ gridTemplateColumns: subcategories.length>0 ? '260px 1fr' : '1fr' }}>
          {(subcategories.length > 0 || allCategories.length > 0) && (
            <aside className="category-sidebar">
              <CategorySidebar
                categories={allCategories.map((c) => ({
                  id: c.id,
                  name: c.name,
                  count: productService.getProductsByCategory(c.id).length,
                  subCategories: productService.getSubcategoriesByCategory(c.id).map((s) => ({
                    id: s.id,
                    name: s.name,
                    count: productService.getProductsByCategory(c.id, s.id).length,
                  }))
                })) as CategoryItem[]}
                selectedCategory={effectiveCategoryId}
                selectedSubCategory={selectedSubcategory || undefined}
                onCategorySelect={(catId) => handleCategoryTabClick(catId)}
                onSubCategorySelect={(_catId, subId) => handleSubcategoryClick(subId)}
                onApplyFilters={(f) => { setFilters(f); loadProducts(effectiveCategoryId, selectedSubcategory, sortBy); }}
              />
            </aside>
          )}

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
