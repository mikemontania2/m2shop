import { API_BASE_URL } from "../Config";
import { ProductResponse, CategoryProductResponse } from "../interfaces/Productos.interface";


// ========== MÉTODOS DEL SERVICIO ==========

/**
 * Obtener productos destacados con paginación (8 items por página)
 */
export const getDestacados = async (page: number = 1, limit =12): Promise<ProductResponse> => {
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
 * Obtener productos nuevos/novedades con paginación (8 items por página)
 */
export const getNovedades = async (page: number = 1,limit =12): Promise<ProductResponse> => {
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
 * Obtener productos por categoría con paginación (8 items por página)
 */
export const getByCategoria = async (slug: string, page: number = 1,limit =12): Promise<CategoryProductResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/variantes/categoria/${slug}?page=${page}&limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al obtener productos por categoría:', error);
    throw error;
  }
};