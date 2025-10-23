import { API_BASE_URL } from "../Config";

// ========== INTERFACES ==========

export interface Product {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number;
  originalPrice: number;
  stock: number;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface ProductResponse {
  success: boolean;
  productos: Product[];
  pagination: Pagination;
}

export interface CategoryProductResponse extends ProductResponse {
  categoria: {
    id: number;
    nombre: string;
    slug: string;
  };
}

// ========== MÉTODOS DEL SERVICIO ==========

/**
 * Obtener productos destacados con paginación (8 items por página)
 */
export const getDestacados = async (page: number = 1): Promise<ProductResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/variantes/destacados?page=${page}`);
    
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
 * Obtener productos nuevos/novedades con paginación (8 items por página)
 */
export const getNovedades = async (page: number = 1): Promise<ProductResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/variantes/novedades?page=${page}`);
    
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
 * Obtener productos por categoría con paginación (8 items por página)
 */
export const getByCategoria = async (slug: string, page: number = 1): Promise<CategoryProductResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/variantes/categoria/${slug}?page=${page}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al obtener productos por categoría:', error);
    throw error;
  }
};