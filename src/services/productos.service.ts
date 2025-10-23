import { API_BASE_URL } from "../Config";
import { ProductResponse, CategoryProductResponse, Product } from "../interfaces/Productos.interface";

// ========== MÉTODOS DEL SERVICIO ==========

/**
 * Obtener productos destacados con paginación
 */
export const getDestacados = async (page: number = 1, limit = 12): Promise<ProductResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/variantes/destacados?page=${page}&limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al obtener destacados:', error);
    throw error;
  }
};

/**
 * Obtener productos nuevos/novedades con paginación
 */
export const getNovedades = async (page: number = 1, limit = 12): Promise<ProductResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/variantes/novedades?page=${page}&limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al obtener novedades:', error);
    throw error;
  }
};

/**
 * Obtener productos por categoría con paginación
 * @param slug - Slug de la categoría o subcategoría
 * @param page - Número de página (default: 1)
 * @param limit - Cantidad de productos por página (default: 12, usa 999 para obtener todos)
 */
export const getByCategoria = async (
  slug: string, 
  page: number = 1, 
  limit = 12
): Promise<CategoryProductResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/variantes/categoria/${slug}?page=${page}&limit=${limit}`
    );
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al obtener productos por categoría:', error);
    throw error;
  }
};

/**
 * Filtrar productos localmente por múltiples criterios
 * Útil cuando ya tienes un array de productos cargado
 */
export const filterProducts = (
  products: Product[],
  filters: {
    priceMin?: number;
    priceMax?: number;
    featured?: boolean;
     news?: boolean;
    inStock?: boolean;
    onSale?: boolean;
    search?: string;
  }
): Product[] => {
  let filtered = [...products];
  
  // Filtro por precio mínimo
  if (filters.priceMin !== undefined) {
    filtered = filtered.filter(p => p.price >= filters.priceMin!);
  }
  
  // Filtro por precio máximo
  if (filters.priceMax !== undefined) {
    filtered = filtered.filter(p => p.price <= filters.priceMax!);
  }
  
  // Filtro por destacados
  if (filters.featured) {
    filtered = filtered.filter(p => p.featured);
  }
  
   if (filters.news) {
    filtered = filtered.filter(p => p.news);
  }
  // Filtro por stock disponible
  if (filters.inStock) {
    filtered = filtered.filter(p => p.stock > 0);
  }
  
  // Filtro por productos en oferta
  if (filters.onSale) {
    filtered = filtered.filter(p => 
      p.originalPrice > 0 && p.originalPrice > p.price
    );
  }
  
  // Filtro por búsqueda de texto
  if (filters.search && filters.search.trim() !== '') {
    const searchLower = filters.search.toLowerCase().trim();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.slug.toLowerCase().includes(searchLower)
    );
  }
  
  return filtered;
};

/**
 * Ordenar productos por diferentes criterios
 */
export const sortProducts = (
  products: Product[],
  sortBy: 'price-asc' | 'price-desc' | 'name' | 'default'
): Product[] => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    
    case 'default':
    default:
      return sorted;
  }
};

/**
 * Aplicar filtros y ordenamiento en un solo paso
 */
export const filterAndSortProducts = (
  products: Product[],
  filters: {
    priceMin?: number;
    priceMax?: number;
    featured?: boolean;
    inStock?: boolean;
    onSale?: boolean;
    search?: string;
  },
  sortBy: 'price-asc' | 'price-desc' | 'name' | 'default' = 'default'
): Product[] => {
  const filtered = filterProducts(products, filters);
  return sortProducts(filtered, sortBy);
};

/**
 * Obtener todas las categorías con sus productos
 * Útil para la página de catálogo completo
 */
export const getAllCategoriesWithProducts = async (
  categorySlugs: string[]
): Promise<Map<string, Product[]>> => {
  const results = new Map<string, Product[]>();
  
  try {
    const promises = categorySlugs.map(slug => 
      getByCategoria(slug, 1, 999).catch(err => {
        console.error(`Error al cargar categoría ${slug}:`, err);
        return null;
      })
    );
    
    const responses = await Promise.all(promises);
    
    responses.forEach((response, index) => {
      if (response?.success && response.productos) {
        results.set(categorySlugs[index], response.productos);
      }
    });
    
  } catch (error) {
    console.error('Error al cargar categorías:', error);
  }
  
  return results;
};

/**
 * Hook personalizado para manejar la carga y filtrado de productos
 * (Opcional - solo si usas custom hooks)
 */
export const useProductFilters = () => {
  // Este sería un custom hook si lo necesitas
  // Por ahora solo exportamos las funciones
  return {
    filterProducts,
    sortProducts,
    filterAndSortProducts
  };
};
 