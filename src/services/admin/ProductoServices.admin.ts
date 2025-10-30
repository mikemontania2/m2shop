// ============================================
// productosAdmin.service.ts
// Servicio exclusivo para administración de productos
// ============================================

import api from "../api";

 

// ============================================
// INTERFACES
// ============================================

export interface ProductoAdmin {
  id: number;
  nombre: string;
  slug: string;
  descripcion?: string;
  usosRecomendados?: string[];
  propiedades?: Record<string, any>;
  categoriaId: number;
  subcategoriaId?: number;
  activo: boolean;
  categoria?: {
    id: number;
    nombre: string;
  };
  subcategoria?: {
    id: number;
    nombre: string;
  };
  variantes?: VarianteAdmin[];
  created_at?: string;
  updated_at?: string;
}

export interface VarianteAdmin {
  id: number;
  productoId: number;
  sku: string;
  nombre: string;
  slug: string;
  precio: number;
  imagenUrl?: string;
  images?: string[];
  stock: number;
  destacado: boolean;
  nuevo: boolean;
  bloqueoDescuento: boolean;
  activo: boolean;
  atributos?: VarianteAtributoAdmin[];
  producto?: {
    id: number;
    nombre: string;
  };
}

export interface VarianteAtributoAdmin {
  id: number;
  varianteId: number;
  valorAtributoId: number;
  orden: number;
  valorAtributo?: {
    id: number;
    valor: string;
    propiedades?: Record<string, any>;
    atributo?: {
      id: number;
      nombre: string;
      orden: number;
    };
  };
}

export interface AtributoAdmin {
  id: number;
  nombre: string;
  orden: number;
  activo: boolean;
  valores?: ValorAtributoAdmin[];
}

export interface ValorAtributoAdmin {
  id: number;
  atributoId: number;
  valor: string;
  propiedades?: Record<string, any>;
  activo: boolean;
  atributo?: {
    id: number;
    nombre: string;
  };
}

export interface ProductosResponse {
  success: boolean;
  productos: ProductoAdmin[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ProductoResponse {
  success: boolean;
  producto: ProductoAdmin;
  mensaje?: string;
}

export interface VarianteResponse {
  success: boolean;
  variante: VarianteAdmin;
  mensaje?: string;
}

export interface AtributosResponse {
  success: boolean;
  atributos: AtributoAdmin[];
}

export interface AtributoResponse {
  success: boolean;
  atributo?: AtributoAdmin;
  valorAtributo?: ValorAtributoAdmin;
  mensaje?: string;
}

// ============================================
// SERVICIOS DE PRODUCTOS
// ============================================

/**
 * Obtener todos los productos con paginación y filtros
 */
export const getAllProductos = async (
  page: number = 1,
  limit: number = 20,
  search?: string,
  categoriaId?: number
): Promise<ProductosResponse> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) params.append('search', search);
    if (categoriaId) params.append('categoriaId', categoriaId.toString());

    const response = await api.get(`/producto-admin/productos?${params.toString()}`);
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener productos:', error);
    throw new Error(error.response?.data?.error || 'Error al obtener productos');
  }
};

/**
 * Obtener un producto por ID con todas sus relaciones
 */
export const getProductoById = async (id: number): Promise<ProductoResponse> => {
  try {
    const response = await api.get(`/producto-admin/productos/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener producto:', error);
    throw new Error(error.response?.data?.error || 'Error al obtener producto');
  }
};

/**
 * Crear un nuevo producto
 */
export const createProducto = async (data: {
  nombre: string;
  slug: string;
  descripcion?: string;
  usosRecomendados?: string[];
  propiedades?: Record<string, any>;
  categoriaId: number;
  subcategoriaId?: number;
  activo?: boolean;
}): Promise<ProductoResponse> => {
  try {
    const response = await api.post('/producto-admin/productos', data);
    return response.data;
  } catch (error: any) {
    console.error('Error al crear producto:', error);
    throw new Error(error.response?.data?.error || 'Error al crear producto');
  }
};

/**
 * Actualizar un producto existente
 */
export const updateProducto = async (
  id: number,
  data: Partial<{
    nombre: string;
    slug: string;
    descripcion: string;
    usosRecomendados: string[];
    propiedades: Record<string, any>;
    categoriaId: number;
    subcategoriaId: number;
    activo: boolean;
  }>
): Promise<ProductoResponse> => {
  try {
    const response = await api.put(`/producto-admin/productos/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error('Error al actualizar producto:', error);
    throw new Error(error.response?.data?.error || 'Error al actualizar producto');
  }
};

/**
 * Eliminar un producto
 */
export const deleteProducto = async (id: number): Promise<{ success: boolean; mensaje: string }> => {
  try {
    const response = await api.delete(`/producto-admin/productos/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error al eliminar producto:', error);
    throw new Error(error.response?.data?.error || 'Error al eliminar producto');
  }
};

// ============================================
// SERVICIOS DE VARIANTES
// ============================================

/**
 * Crear una nueva variante
 */
export const createVariante = async (data: {
  productoId: number;
  sku: string;
  nombre: string;
  slug: string;
  precio: number;
  imagenUrl?: string;
  images?: string[];
  stock?: number;
  destacado?: boolean;
  nuevo?: boolean;
  bloqueoDescuento?: boolean;
  activo?: boolean;
  atributos?: Array<{ valorAtributoId: number; orden: number }>;
}): Promise<VarianteResponse> => {
  try {
    const response = await api.post('/producto-admin/variantes', data);
    return response.data;
  } catch (error: any) {
    console.error('Error al crear variante:', error);
    throw new Error(error.response?.data?.error || 'Error al crear variante');
  }
};

/**
 * Actualizar una variante existente
 */
export const updateVariante = async (
  id: number,
  data: Partial<{
    sku: string;
    nombre: string;
    slug: string;
    precio: number;
    imagenUrl: string;
    images: string[];
    stock: number;
    destacado: boolean;
    nuevo: boolean;
    bloqueoDescuento: boolean;
    activo: boolean;
    atributos: Array<{ valorAtributoId: number; orden: number }>;
  }>
): Promise<VarianteResponse> => {
  try {
    const response = await api.put(`/producto-admin/variantes/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error('Error al actualizar variante:', error);
    throw new Error(error.response?.data?.error || 'Error al actualizar variante');
  }
};

/**
 * Eliminar una variante
 */
export const deleteVariante = async (id: number): Promise<{ success: boolean; mensaje: string }> => {
  try {
    const response = await api.delete(`/producto-admin/variantes/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error al eliminar variante:', error);
    throw new Error(error.response?.data?.error || 'Error al eliminar variante');
  }
};

// ============================================
// SERVICIOS DE ATRIBUTOS
// ============================================

/**
 * Obtener todos los atributos con sus valores
 */
export const getAllAtributos = async (): Promise<AtributosResponse> => {
  try {
    const response = await api.get('/producto-admin/atributos');
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener atributos:', error);
    throw new Error(error.response?.data?.error || 'Error al obtener atributos');
  }
};

/**
 * Crear un nuevo atributo
 */
export const createAtributo = async (data: {
  nombre: string;
  orden?: number;
  activo?: boolean;
}): Promise<AtributoResponse> => {
  try {
    const response = await api.post('/producto-admin/atributos', data);
    return response.data;
  } catch (error: any) {
    console.error('Error al crear atributo:', error);
    throw new Error(error.response?.data?.error || 'Error al crear atributo');
  }
};

/**
 * Crear un nuevo valor de atributo
 */
export const createValorAtributo = async (data: {
  atributoId: number;
  valor: string;
  propiedades?: Record<string, any>;
  activo?: boolean;
}): Promise<AtributoResponse> => {
  try {
    const response = await api.post('/producto-admin/atributos/valores', data);
    return response.data;
  } catch (error: any) {
    console.error('Error al crear valor de atributo:', error);
    throw new Error(error.response?.data?.error || 'Error al crear valor de atributo');
  }
};

// ============================================
// UTILIDADES
// ============================================

/**
 * Generar slug a partir de un texto
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/[^a-z0-9]+/g, '-') // Reemplazar espacios y caracteres especiales
    .replace(/^-+|-+$/g, ''); // Eliminar guiones al inicio/final
};

/**
 * Generar SKU automático
 */
export const generateSKU = (productoNombre: string, atributos: string[]): string => {
  const prefix = productoNombre
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 3);
  
  const suffix = atributos
    .map(attr => attr.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 3))
    .join('-');
  
  const timestamp = Date.now().toString().slice(-4);
  
  return `${prefix}-${suffix}-${timestamp}`;
};

/**
 * Validar datos de producto
 */
export const validateProductoData = (data: Partial<ProductoAdmin>): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.nombre || data.nombre.trim() === '') {
    errors.push('El nombre es obligatorio');
  }

  if (!data.slug || data.slug.trim() === '') {
    errors.push('El slug es obligatorio');
  }

  if (!data.categoriaId) {
    errors.push('La categoría es obligatoria');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Validar datos de variante
 */
export const validateVarianteData = (data: Partial<VarianteAdmin>): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.productoId) {
    errors.push('El ID del producto es obligatorio');
  }

  if (!data.sku || data.sku.trim() === '') {
    errors.push('El SKU es obligatorio');
  }

  if (!data.nombre || data.nombre.trim() === '') {
    errors.push('El nombre es obligatorio');
  }

  if (!data.slug || data.slug.trim() === '') {
    errors.push('El slug es obligatorio');
  }

  if (data.precio === undefined || data.precio < 0) {
    errors.push('El precio debe ser mayor o igual a 0');
  }

  if (data.stock !== undefined && data.stock < 0) {
    errors.push('El stock no puede ser negativo');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

export default {
  // Productos
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  
  // Variantes
  createVariante,
  updateVariante,
  deleteVariante,
  
  // Atributos
  getAllAtributos,
  createAtributo,
  createValorAtributo,
  
  // Utilidades
  generateSlug,
  generateSKU,
  validateProductoData,
  validateVarianteData
};