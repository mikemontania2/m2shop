/**
 * TIPOS E INTERFACES PARA EL CARRITO DE COMPRAS
 *
 * Este archivo define todas las interfaces y tipos relacionados con el carrito de compras.
 * Estas interfaces están diseñadas para ser compatibles con el backend API.
 */

import type { Product } from "../services/productService"

/**
 * CartItem - Representa un producto en el carrito
 *
 * @property product - El producto completo con toda su información
 * @property quantity - Cantidad de unidades del producto
 * @property size - Talla/presentación seleccionada (ej: "M", "L", "500ml")
 * @property color - Color/variedad seleccionada (ej: "Rojo", "Azul", "Natural")
 */
export interface CartItem {
  product: Product
  quantity: number
  size: string
  color: string
}

/**
 * AddToCartRequest - Datos necesarios para agregar un producto al carrito
 * Se envía al backend cuando el usuario agrega un producto
 */
export interface AddToCartRequest {
  productId: number
  variantId?: number // ID de la variante específica si aplica
  quantity: number
  size: string
  color: string
}

/**
 * UpdateCartItemRequest - Datos para actualizar la cantidad de un item
 */
export interface UpdateCartItemRequest {
  productId: number
  size: string
  color: string
  quantity: number
}

/**
 * RemoveFromCartRequest - Datos para eliminar un item del carrito
 */
export interface RemoveFromCartRequest {
  productId: number
  size: string
  color: string
}

/**
 * CartResponse - Respuesta del backend con el estado actual del carrito
 *
 * @property items - Lista de productos en el carrito
 * @property subtotal - Suma de todos los productos (sin envío)
 * @property shipping - Costo de envío
 * @property total - Total a pagar (subtotal + envío)
 * @property itemCount - Cantidad total de items en el carrito
 */
export interface CartResponse {
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  itemCount: number
}

/**
 * CartSummary - Resumen del carrito para mostrar en UI
 */
export interface CartSummary {
  itemCount: number
  subtotal: number
  total: number
}
