/**
 * ============================================
 * TIPOS E INTERFACES PARA ADMINISTRACIÓN
 * ============================================
 *
 * Este archivo contiene todas las interfaces y tipos necesarios
 * para las operaciones de administración del e-commerce.
 *
 * Cada sección está documentada con:
 * - Descripción del modelo
 * - Campos requeridos y opcionales
 * - Tipos de request/response para API
 */

// ============================================
// BANNERS
// ============================================

/**
 * Banner del carrusel principal
 * Se muestra en la página de inicio
 */
export interface Banner {
  id: number
  title: string
  subtitle: string
  image: string
  active: boolean
  order: number
  link?: string // URL opcional para redirección al hacer clic
  createdAt?: string
  updatedAt?: string
}

/**
 * Request para crear un nuevo banner
 */
export interface CreateBannerRequest {
  title: string
  subtitle: string
  image: string
  active?: boolean
  order?: number
  link?: string
}

/**
 * Request para actualizar un banner existente
 */
export interface UpdateBannerRequest {
  title?: string
  subtitle?: string
  image?: string
  active?: boolean
  order?: number
  link?: string
}

/**
 * Response del API para operaciones de banners
 */
export interface BannerResponse {
  success: boolean
  message?: string
  banner?: Banner
  banners?: Banner[]
}

// ============================================
// SUCURSALES (BRANCHES)
// ============================================

/**
 * Sucursal física de la empresa
 * Incluye ubicación geográfica y área de cobertura
 */
export interface Branch {
  id: string
  name: string
  address: string
  lat: number
  lng: number
  phone: string
  email?: string
  hours?: string // Horario de atención
  coverage?: [number, number][] // Polígono de área de cobertura [[lat, lng], ...]
  active?: boolean
  createdAt?: string
  updatedAt?: string
}

/**
 * Request para crear una nueva sucursal
 */
export interface CreateBranchRequest {
  name: string
  address: string
  lat: number
  lng: number
  phone: string
  email?: string
  hours?: string
  coverage?: [number, number][]
  active?: boolean
}

/**
 * Request para actualizar una sucursal existente
 */
export interface UpdateBranchRequest {
  name?: string
  address?: string
  lat?: number
  lng?: number
  phone?: string
  email?: string
  hours?: string
  coverage?: [number, number][]
  active?: boolean
}

/**
 * Response del API para operaciones de sucursales
 */
export interface BranchResponse {
  success: boolean
  message?: string
  branch?: Branch
  branches?: Branch[]
}

// ============================================
// DESCUENTOS (DISCOUNTS)
// ============================================

/**
 * Descuento aplicable a productos
 * Puede ser general o específico para ciertos productos
 */
export interface Discount {
  id: string
  name: string
  percentage: number // 0-100
  active: boolean
  productIds?: number[] // IDs de productos a los que aplica (vacío = todos)
  categoryIds?: string[] // IDs de categorías a las que aplica
  startDate?: string
  endDate?: string
  minPurchase?: number // Monto mínimo de compra
  maxDiscount?: number // Descuento máximo en monto
  code?: string // Código de cupón opcional
  createdAt?: string
  updatedAt?: string
}

/**
 * Request para crear un nuevo descuento
 */
export interface CreateDiscountRequest {
  name: string
  percentage: number
  active?: boolean
  productIds?: number[]
  categoryIds?: string[]
  startDate?: string
  endDate?: string
  minPurchase?: number
  maxDiscount?: number
  code?: string
}

/**
 * Request para actualizar un descuento existente
 */
export interface UpdateDiscountRequest {
  name?: string
  percentage?: number
  active?: boolean
  productIds?: number[]
  categoryIds?: string[]
  startDate?: string
  endDate?: string
  minPurchase?: number
  maxDiscount?: number
  code?: string
}

/**
 * Response del API para operaciones de descuentos
 */
export interface DiscountResponse {
  success: boolean
  message?: string
  discount?: Discount
  discounts?: Discount[]
}

// ============================================
// ÁREAS DE COBERTURA (COVERAGE)
// ============================================

/**
 * Área de cobertura para delivery
 * Define zonas geográficas donde se realiza entrega
 */
export interface CoverageArea {
  id: string
  name: string
  color: string // Color para visualización en mapa
  weight: number // Grosor de línea en mapa
  fillOpacity: number // Opacidad del relleno (0-1)
  coordinates: [number, number][] // Polígono [[lat, lng], ...]
  deliveryCost?: number // Costo de envío en esta área
  deliveryTime?: string // Tiempo estimado de entrega
  active?: boolean
  createdAt?: string
  updatedAt?: string
}

/**
 * Request para crear una nueva área de cobertura
 */
export interface CreateCoverageRequest {
  name: string
  color?: string
  weight?: number
  fillOpacity?: number
  coordinates: [number, number][]
  deliveryCost?: number
  deliveryTime?: string
  active?: boolean
}

/**
 * Request para actualizar un área de cobertura existente
 */
export interface UpdateCoverageRequest {
  name?: string
  color?: string
  weight?: number
  fillOpacity?: number
  coordinates?: [number, number][]
  deliveryCost?: number
  deliveryTime?: string
  active?: boolean
}

/**
 * Response del API para operaciones de áreas de cobertura
 */
export interface CoverageResponse {
  success: boolean
  message?: string
  area?: CoverageArea
  areas?: CoverageArea[]
}

// ============================================
// PRODUCTOS (PRODUCTS) - ADMIN
// ============================================

/**
 * Request para crear un nuevo producto (admin)
 * Incluye todos los campos necesarios para el backend
 */
export interface CreateProductRequest {
  name: string
  slug?: string // Se genera automáticamente si no se proporciona
  category: string
  subcategory?: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  description: string
  descripcion?: string
  propiedades?: string[]
  usosRecomendados?: string[]
  stock: number
  featured?: boolean
  news?: boolean
  // Atributos para variantes
  attributes?: {
    name: string
    values: string[]
  }[]
}

/**
 * Request para actualizar un producto existente (admin)
 */
export interface UpdateProductRequest {
  name?: string
  slug?: string
  category?: string
  subcategory?: string
  price?: number
  originalPrice?: number
  image?: string
  images?: string[]
  description?: string
  descripcion?: string
  propiedades?: string[]
  usosRecomendados?: string[]
  stock?: number
  featured?: boolean
  news?: boolean
  attributes?: {
    name: string
    values: string[]
  }[]
}

/**
 * Response del API para operaciones de productos (admin)
 */
export interface ProductAdminResponse {
  success: boolean
  message?: string
  product?: any // Usar el tipo Product de productos.interface
  products?: any[]
}

// ============================================
// PEDIDOS (ORDERS) - ADMIN
// ============================================

/**
 * Estado de un pedido
 */
export type OrderStatus =
  | "pending" // Pendiente de confirmación
  | "confirmed" // Confirmado
  | "processing" // En preparación
  | "shipped" // Enviado
  | "delivered" // Entregado
  | "cancelled" // Cancelado
  | "refunded" // Reembolsado

/**
 * Request para actualizar el estado de un pedido
 */
export interface UpdateOrderStatusRequest {
  status: OrderStatus
  notes?: string // Notas adicionales sobre el cambio de estado
}

/**
 * Response del API para operaciones de pedidos (admin)
 */
export interface OrderAdminResponse {
  success: boolean
  message?: string
  order?: any // Usar el tipo Order de order.types
  orders?: any[]
  total?: number // Total de pedidos (para paginación)
  page?: number
  limit?: number
}

// ============================================
// ESTADÍSTICAS (DASHBOARD)
// ============================================

/**
 * Estadísticas generales del dashboard admin
 */
export interface DashboardStats {
  totalOrders: number
  totalRevenue: number
  totalProducts: number
  totalCustomers: number
  pendingOrders: number
  lowStockProducts: number
  recentOrders: any[] // Últimos pedidos
  topProducts: any[] // Productos más vendidos
  revenueByMonth: {
    month: string
    revenue: number
  }[]
}

/**
 * Response del API para estadísticas del dashboard
 */
export interface DashboardStatsResponse {
  success: boolean
  message?: string
  stats?: DashboardStats
}

// ============================================
// TIPOS GENÉRICOS DE RESPUESTA
// ============================================

/**
 * Response genérica para operaciones exitosas
 */
export interface SuccessResponse {
  success: true
  message: string
  data?: any
}

/**
 * Response genérica para errores
 */
export interface ErrorResponse {
  success: false
  message: string
  error?: string
  errors?: Record<string, string[]> // Errores de validación por campo
}

/**
 * Response con paginación
 */
export interface PaginatedResponse<T> {
  success: boolean
  message?: string
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
