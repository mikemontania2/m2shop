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

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasMore: boolean;
  };
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