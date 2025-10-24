/**
 * SERVICIO DE PEDIDOS/ÓRDENES
 *
 * Maneja la creación y consulta de pedidos.
 * Actualmente usa localStorage para persistencia local.
 *
 * PREPARADO PARA INTEGRACIÓN CON BACKEND:
 * - Las interfaces están en src/types/order.types.ts
 * - Solo necesitas descomentar las secciones de API
 */

import type { CartItem } from "./cartService"
import type { User } from "./authService"
import type { Order } from "../types/order.types"

// CONFIGURACIÓN DEL API (descomentar cuando tengas el backend)
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class OrderService {
  private orders: Order[] = []

  constructor() {
    this.loadOrders()
  }

  /**
   * Carga los pedidos desde localStorage
   * TODO: Reemplazar con GET /api/orders cuando el backend esté listo
   */
  private loadOrders(): void {
    const savedOrders = localStorage.getItem("orders")
    if (savedOrders) {
      this.orders = JSON.parse(savedOrders)
    }
  }

  /**
   * Guarda los pedidos en localStorage
   * TODO: No será necesario cuando uses el backend
   */
  private saveOrders(): void {
    localStorage.setItem("orders", JSON.stringify(this.orders))
  }

  /**
   * Crea un nuevo pedido
   *
   * @param user - Usuario que realiza el pedido
   * @param items - Items del carrito
   * @param shippingAddress - Dirección de envío
   * @param paymentMethod - Método de pago seleccionado
   * @returns El pedido creado
   *
   * INTEGRACIÓN CON BACKEND:
   * POST /api/orders/create
   * Body: CreateOrderRequest
   * Response: OrderResponse
   */
  async createOrder(user: User, items: CartItem[], shippingAddress: string, paymentMethod: string): Promise<Order> {
    // TODO: Descomentar cuando tengas el backend
    // const request: CreateOrderRequest = {
    //   items,
    //   shippingAddress: {
    //     street: shippingAddress, // Parsear la dirección correctamente
    //     number: '',
    //     neighborhood: '',
    //     city: '',
    //     phone: user.phone
    //   },
    //   paymentMethod: paymentMethod as any,
    //   notes: ''
    // };
    //
    // const response = await fetch(`${API_URL}/orders/create`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(request),
    //   credentials: 'include'
    // });
    //
    // const data: OrderResponse = await response.json();
    // if (data.success && data.order) {
    //   return data.order;
    // }
    // throw new Error(data.message || 'Error al crear el pedido');

    // IMPLEMENTACIÓN LOCAL (actual)
    const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0)
    const shipping = subtotal >= 500000 ? 0 : 50000

    const order: Order = {
      id: `ORD-${Date.now()}`,
      userId: user.id,
      user,
      items,
      subtotal,
      shipping,
      total: subtotal + shipping,
      status: "pending",
      paymentMethod: paymentMethod as any,
      shippingAddress: {
        street: shippingAddress,
        number: "",
        neighborhood: "",
        city: "",
        phone: user.phone,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    this.orders.push(order)
    this.saveOrders()
    return order
  }

  /**
   * Obtiene todos los pedidos
   *
   * INTEGRACIÓN CON BACKEND:
   * GET /api/orders
   * Response: OrderListResponse
   */
  async getOrders(): Promise<Order[]> {
    // TODO: Descomentar cuando tengas el backend
    // const response = await fetch(`${API_URL}/orders`, {
    //   credentials: 'include'
    // });
    // const data: OrderListResponse = await response.json();
    // return data.orders;

    return this.orders
  }

  /**
   * Obtiene los pedidos de un usuario específico
   *
   * @param userId - ID del usuario
   *
   * INTEGRACIÓN CON BACKEND:
   * GET /api/orders/user/:userId
   * Response: OrderListResponse
   */
  async getOrdersByUser(userId: number): Promise<Order[]> {
    // TODO: Descomentar cuando tengas el backend
    // const response = await fetch(`${API_URL}/orders/user/${userId}`, {
    //   credentials: 'include'
    // });
    // const data: OrderListResponse = await response.json();
    // return data.orders;

    return this.orders.filter((order) => order.userId === userId)
  }

  /**
   * Obtiene un pedido por su ID
   *
   * @param id - ID del pedido
   *
   * INTEGRACIÓN CON BACKEND:
   * GET /api/orders/:id
   * Response: OrderResponse
   */
  async getOrderById(id: string): Promise<Order | undefined> {
    // TODO: Descomentar cuando tengas el backend
    // const response = await fetch(`${API_URL}/orders/${id}`, {
    //   credentials: 'include'
    // });
    // const data: OrderResponse = await response.json();
    // return data.order;

    return this.orders.find((order) => order.id === id)
  }

  /**
   * Actualiza el estado de un pedido
   * Solo para administradores
   *
   * @param orderId - ID del pedido
   * @param status - Nuevo estado
   *
   * INTEGRACIÓN CON BACKEND:
   * PUT /api/orders/:id/status
   * Body: { status: OrderStatus }
   */
  async updateOrderStatus(orderId: string, status: string): Promise<void> {
    // TODO: Descomentar cuando tengas el backend
    // await fetch(`${API_URL}/orders/${orderId}/status`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ status }),
    //   credentials: 'include'
    // });

    const order = this.orders.find((o) => o.id === orderId)
    if (order) {
      order.status = status as any
      order.updatedAt = new Date().toISOString()
      this.saveOrders()
    }
  }

  /**
   * Cancela un pedido
   *
   * @param orderId - ID del pedido a cancelar
   *
   * INTEGRACIÓN CON BACKEND:
   * PUT /api/orders/:id/cancel
   */
  async cancelOrder(orderId: string): Promise<void> {
    await this.updateOrderStatus(orderId, "cancelled")
  }
}

export default new OrderService()
export type { Order }
