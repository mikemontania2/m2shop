// ========== INTERFACES PARA ATRIBUTOS ==========

export interface Atributo {
  id: number;
  nombre: string;
  orden: number;
  activo: boolean;
}

export interface ValorAtributo {
  id: number;
  atributoId: number;
  valor: string;
  propiedades?: {
    color?: string;      // Para variedad (ej: "#eb961e")
    imagen?: string;     // Para presentación (URL)
    [key: string]: any;
  };
  activo: boolean;
}

export interface VarianteAtributo {
  id: number;
  varianteId: number;
  valorAtributoId: number;
  orden: number;
  valorAtributo?: ValorAtributo;
}

// ========== INTERFACES PARA PRODUCTO Y VARIANTE ==========

export interface Categoria {
  id: number;
  nombre: string;
  slug: string;
  imagenUrl?: string;
  bannerUrl?: string;
}

export interface Producto {
  id: number;
  nombre: string;
  slug: string;
  descripcion?: string;
  usosRecomendados?: string[];
  propiedades?: string[];
  categoriaId: number;
  subcategoriaId?: number;
  activo: boolean;
  categoria?: Categoria;
  subcategoria?: Categoria;
  variantes?: Variante[];
}

export interface Variante {
  id: number;
  productoId: number;
  sku: string;
  slug: string;
  precio: number;
  precioOriginal?: number;
  imagenUrl?: string;
  images?: string[];
  stock: number;
  destacado: boolean;
  nuevo: boolean;
  activo: boolean;
  producto?: Producto;
  atributos?: VarianteAtributo[];
  // Campos calculados/concatenados del backend
  nombreCompleto?: string;  // "Lavandina Concentrada 5L - Limón"
  variedad?: string;         // "Limón"
  variedadColor?: string;    // "#eb961e"
  presentacion?: string;     // "5L"
  presentacionImagen?: string; // URL de la imagen de presentación
}

// ========== INTERFACE SIMPLIFICADA PARA PRODUCT CARD ==========
// Esta es la que usaremos en los carruseles y listados

export interface ProductCardData {
  id: number;              // varianteId
  name: string;            // nombreCompleto de la variante
  image: string;           // imagenUrl de la variante
  price: number;           // precio
  originalPrice: number;   // precioOriginal o 0
  slug: string;            // slug de la variante
  stock: number;           // stock
  destacado?: boolean;     // para filtrar destacados
  nuevo?: boolean;         // para filtrar novedades
  // Datos adicionales opcionales
  variedad?: string;
  variedadColor?: string;
  presentacion?: string;
  presentacionImagen?: string;
}

// ========== RESPONSE TYPES DEL BACKEND ==========

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
 

// ========== HELPER PARA CONVERTIR VARIANTE A PRODUCT CARD ==========

export function varianteToProductCard(variante: Variante): ProductCardData {
  return {
    id: variante.id,
    name: variante.nombreCompleto || variante.producto?.nombre || 'Producto',
    image: variante.imagenUrl || '/placeholder.svg',
    price: variante.precio,
    originalPrice: variante.precioOriginal || 0,
    slug: variante.slug,
    stock: variante.stock,
    destacado: variante.destacado,
    nuevo: variante.nuevo,
    variedad: variante.variedad,
    variedadColor: variante.variedadColor,
    presentacion: variante.presentacion,
    presentacionImagen: variante.presentacionImagen
  };
}

// ============================================
// INTERFACES PARA RESPUESTAS DE LA API
// ============================================

/**
 * Respuesta genérica de la API
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * Respuesta paginada de la API
 */
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

// ============================================
// INTERFACES DE DOMINIO (del Backend)
// ============================================

export interface Categoria {
  id: number;
  nombre: string;
  slug: string;
  imagenUrl?: string;
  bannerUrl?: string;
  activo: boolean;
}

export interface Atributo {
  id: number;
  nombre: string;
  orden: number;
}

export interface ValorAtributo {
  id: number;
  atributoId: number;
  valor: string;
  propiedades?: {
    color?: string;
    imagen?: string;
    [key: string]: any;
  };
  atributo?: Atributo;
}

export interface VarianteAtributo {
  id: number;
  varianteId: number;
  valorAtributoId: number;
  orden: number;
  valorAtributo?: ValorAtributo;
}

export interface Producto {
  id: number;
  nombre: string;
  slug: string;
  descripcion?: string;
  usosRecomendados?: string[];
  propiedades?: string[];
  categoriaId: number;
  subcategoriaId?: number;
  activo: boolean;
  categoria?: Categoria;
}

/**
 * Variante completa del backend (con datos procesados)
 */
export interface VarianteBackend {
  id: number;
  productoId: number;
  sku: string;
  slug: string;
  precio: number;
  precioOriginal?: number;
  imagenUrl?: string;
  images?: string[];
  stock: number;
  destacado: boolean;
  nuevo: boolean;
  activo: boolean;
  // Campos procesados por el backend
  nombreCompleto?: string;
  variedad?: string;
  variedadColor?: string;
  presentacion?: string;
  presentacionImagen?: string;
  // Relaciones
  producto?: Producto;
  atributos?: VarianteAtributo[];
}

// ============================================
// INTERFACES PARA EL FRONTEND (ProductCard)
// ============================================

/**
 * Datos mínimos necesarios para renderizar una ProductCard
 * Esta es la interfaz optimizada para los carruseles
 */
export interface ProductCardData {
  id: number;              // varianteId
  name: string;            // nombreCompleto
  slug: string;            // slug de la variante
  image: string;           // imagenUrl principal
  price: number;           // precio actual
  originalPrice: number;   // precio original (0 si no hay descuento)
  stock: number;           // stock disponible
  // Atributos visuales
  variedad?: string;       // ej: "Limón"
  variedadColor?: string;  // ej: "#eb961e"
  presentacion?: string;   // ej: "5L"
  // Flags para filtros
  featured?: boolean;
  nuevo?: boolean;
  // Metadata mínima
  categorySlug?: string;
}

/**
 * Datos completos del producto para la página de detalle
 */
export interface ProductDetail extends ProductCardData {
  images: string[];              // Todas las imágenes
  description: string;           // Descripción completa
  usosRecomendados: string[];   // Usos recomendados
  propiedades: string[];        // Propiedades del producto
  sku: string;                  // SKU
  // Información de la categoría
  categoria: {
    id: number;
    nombre: string;
    slug: string;
  };
  // Otras variantes del mismo producto
  variantes?: ProductCardData[];
}

// ============================================
// PARÁMETROS DE CONSULTA
// ============================================

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  categoriaId?: number;
  destacado?: boolean;
  nuevo?: boolean;
  search?: string;
  precioMin?: number;
  precioMax?: number;
  orderBy?: 'precio' | 'nombre' | 'created_at';
  order?: 'ASC' | 'DESC';
}

// ============================================
// HELPERS DE TRANSFORMACIÓN
// ============================================

/**
 * Convierte una VarianteBackend a ProductCardData
 * Optimizado para minimizar el tamaño de datos
 */
export function varianteToCard(variante: VarianteBackend): ProductCardData {
  return {
    id: variante.id,
    name: variante.nombreCompleto || variante.producto?.nombre || 'Producto',
    slug: variante.slug,
    image: variante.imagenUrl || '/placeholder.svg',
    price: variante.precio,
    originalPrice: variante.precioOriginal || 0,
    stock: variante.stock,
    variedad: variante.variedad,
    variedadColor: variante.variedadColor,
    presentacion: variante.presentacion,
    featured: variante.destacado,
    nuevo: variante.nuevo,
    categorySlug: variante.producto?.categoria?.slug
  };
}

/**
 * Convierte una VarianteBackend a ProductDetail
 */
export function varianteToDetail(variante: VarianteBackend): ProductDetail {
  const card = varianteToCard(variante);
  
  return {
    ...card,
    images: variante.images || [variante.imagenUrl || '/placeholder.svg'],
    description: variante.producto?.descripcion || '',
    usosRecomendados: variante.producto?.usosRecomendados || [],
    propiedades: variante.producto?.propiedades || [],
    sku: variante.sku,
    categoria: {
      id: variante.producto?.categoriaId || 0,
      nombre: variante.producto?.categoria?.nombre || '',
      slug: variante.producto?.categoria?.slug || ''
    }
  };
}

// ============================================
// TIPOS PARA CACHÉ
// ============================================

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

export interface CacheOptions {
  ttl?: number; // Time to live en milisegundos
  key: string;
}

// ========== INTERFACES ==========

export interface Product {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number;
  news:boolean;
    featured:boolean;
  originalPrice: number;
  stock: number;
}

export interface Pagination {
  total: number;
  pages: number;
  limit: number;
  current: number;
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
