/**
 * TIPOS E INTERFACES PARA PEDIDOS/ÓRDENES
 *
 * Este archivo define todas las interfaces relacionadas con los pedidos.
 * Diseñadas para integrarse con el backend API de órdenes.
 */

import type { CartItem } from "./cart.types"
import type { User } from "../services/authService"

/**
 * OrderStatus - Estados posibles de un pedido
 */
export type OrderStatus =
  | "pending" // Pendiente de confirmación
  | "confirmed" // Confirmado por el vendedor
  | "processing" // En preparación
  | "shipped" // Enviado
  | "delivered" // Entregado
  | "cancelled" // Cancelado

/**
 * PaymentMethod - Métodos de pago disponibles
 */
export type PaymentMethod =
  | "cash" // Efectivo contra entrega
  | "transfer" // Transferencia bancaria
  | "card" // Tarjeta de crédito/débito
  | "qr" // Código QR (ej: Tigo Money, Billetera Personal)

/**
 * Order - Representa un pedido completo
 */
export interface Order {
  id: string
  userId: number
  user: User
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  status: OrderStatus
  paymentMethod: PaymentMethod
  shippingAddress: ShippingAddress
  createdAt: string
  updatedAt: string
  notes?: string
}

/**
 * ShippingAddress - Dirección de envío completa
 */
export interface ShippingAddress {
  street: string
  number: string
  neighborhood: string
  city: string
  reference?: string
  phone: string
  recipientName?: string
}

/**
 * CreateOrderRequest - Datos necesarios para crear un nuevo pedido
 * Se envía al backend cuando el usuario confirma la compra
 */
export interface CreateOrderRequest {
  items: CartItem[]
  shippingAddress: ShippingAddress
  paymentMethod: PaymentMethod
  notes?: string
}

/**
 * OrderResponse - Respuesta del backend al crear/obtener un pedido
 */
export interface OrderResponse {
  success: boolean
  order?: Order
  message?: string
}

/**
 * OrderListResponse - Respuesta del backend con lista de pedidos
 */
export interface OrderListResponse {
  success: boolean
  orders: Order[]
  total: number
  page: number
  limit: number
}
