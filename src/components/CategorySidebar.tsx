import React, { useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, SlidersHorizontal, X } from 'lucide-react';

export interface SubCategoryItem {
  id: string;
  name: string;
  count?: number;
}

export interface CategoryItem {
  id: string;
  name: string;
  count?: number;
  subCategories?: SubCategoryItem[];
}

interface CategorySidebarProps {
  categories: CategoryItem[];
  selectedCategory?: string;
  selectedSubCategory?: string;
  onCategorySelect?: (categoryId: string) => void;
  onSubCategorySelect?: (categoryId: string, subCategoryId: string) => void;
  className?: string;
  // New optional filter hooks
  onApplyFilters?: (filters: { priceMin?: number; priceMax?: number; featured?: boolean; inStock?: boolean; onSale?: boolean; }) => void;
}

const cn = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  selectedCategory,
  selectedSubCategory,
  onCategorySelect,
  onSubCategorySelect,
  className,
  onApplyFilters,
}) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);

  const toggleCategory = (categoryId: string) => {
    const next = new Set(expanded);
    if (next.has(categoryId)) next.delete(categoryId); else next.add(categoryId);
    setExpanded(next);
  };

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect?.(categoryId);
    const cat = categories.find(c => c.id === categoryId);
    if (cat?.subCategories && cat.subCategories.length > 0) toggleCategory(categoryId);
  };

  return (
    <div className={cn('category-sidebar-panel', className)}>
      <div className="category-sidebar-header">
        <h2>Categorías</h2>
        <button className="filters-toggle" onClick={() => setShowFilters((s) => !s)}>
          <SlidersHorizontal size={16} /> Filtros
        </button>
      </div>
      {showFilters && (
        <div className="filters-panel">
          <div className="filters-row">
            <div className="filter-field">
              <label>Precio mín.</label>
              <input type="number" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} placeholder="0" />
            </div>
            <div className="filter-field">
              <label>Precio máx.</label>
              <input type="number" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} placeholder="999999" />
            </div>
          </div>
          <div className="filters-row">
            <label className="check"><input type="checkbox" checked={featuredOnly} onChange={(e) => setFeaturedOnly(e.target.checked)} /> Destacados</label>
            <label className="check"><input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} /> En stock</label>
            <label className="check"><input type="checkbox" checked={onSaleOnly} onChange={(e) => setOnSaleOnly(e.target.checked)} /> En oferta</label>
          </div>
          <div className="filters-actions">
            <button
              className="btn-secondary"
              onClick={() => {
                setPriceMin(''); setPriceMax(''); setFeaturedOnly(false); setInStockOnly(false); setOnSaleOnly(false);
                onApplyFilters?.({});
              }}
            >
              Limpiar
            </button>
            <button
              className="btn-primary"
              onClick={() => onApplyFilters?.({
                priceMin: priceMin ? parseInt(priceMin) : undefined,
                priceMax: priceMax ? parseInt(priceMax) : undefined,
                featured: featuredOnly || undefined,
                inStock: inStockOnly || undefined,
                onSale: onSaleOnly || undefined,
              })}
            >
              Aplicar filtros
            </button>
          </div>
        </div>
      )}
      <div className="category-sidebar-scroll">
        <div className="category-sidebar-content">
          {categories.map((cat) => {
            const isExpanded = expanded.has(cat.id);
            const isSelected = selectedCategory === cat.id;
            const hasSubs = !!(cat.subCategories && cat.subCategories.length > 0);
            return (
              <div key={cat.id} className="category-sidebar-block">
                <button
                  className={cn('cat-btn', isSelected && 'active')}
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  <span className="cat-label">
                    {hasSubs && (
                      <span className="chev">{isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>
                    )}
                    <span className={!hasSubs ? 'ml-6' : ''}>{cat.name}</span>
                  </span>
                  {typeof cat.count === 'number' && <span className="cat-count">({cat.count})</span>}
                </button>
                {hasSubs && isExpanded && (
                  <div className="subcat-list">
                    {cat.subCategories!.map((sub) => {
                      const isSubSelected = selectedSubCategory === sub.id && selectedCategory === cat.id;
                      return (
                        <button
                          key={sub.id}
                          className={cn('subcat-btn', isSubSelected && 'active')}
                          onClick={() => onSubCategorySelect?.(cat.id, sub.id)}
                        >
                          <span>{sub.name}</span>
                          {typeof sub.count === 'number' && <span className="subcat-count">({sub.count})</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;
