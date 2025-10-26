/**
 * ============================================
 * SERVICIO DE PEDIDOS - ADMINISTRACIÓN
 * ============================================
 *
 * Gestiona las operaciones de visualización y actualización de pedidos.
 *
 * ENDPOINTS DEL BACKEND:
 * - GET    /api/admin/orders              - Obtener todos los pedidos (con paginación)
 * - GET    /api/admin/orders/:id          - Obtener un pedido por ID
 * - PUT    /api/admin/orders/:id/status   - Actualizar estado del pedido
 * - GET    /api/admin/orders/stats        - Obtener estadísticas de pedidos
 */

import type { OrderAdminResponse, OrderStatus, UpdateOrderStatusRequest } from "../../types/admin.types"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"
const ORDERS_ENDPOINT = `${API_URL}/api/admin/orders`

const getAuthToken = (): string | null => {
  const user = localStorage.getItem("user")
  if (!user) return null
  try {
    const userData = JSON.parse(user)
    return userData.token || null
  } catch {
    return null
  }
}

const getHeaders = (): HeadersInit => {
  const token = getAuthToken()
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

/**
 * Obtiene todos los pedidos con paginación y filtros
 *
 * @param page - Número de página (default: 1)
 * @param limit - Cantidad de pedidos por página (default: 20)
 * @param status - Filtrar por estado (opcional)
 * @param search - Buscar por nombre de cliente o ID de pedido (opcional)
 * @returns Promise con la lista de pedidos
 *
 * EJEMPLO DE USO:
 * ```typescript
 * const orders = await getAllOrders(1, 20, 'pending')
 * if (orders.success) {
 *   console.log(orders.orders)
 *   console.log(`Total: ${orders.total}`)
 * }
 * ```
 */
export const getAllOrders = async (
  page = 1,
  limit = 20,
  status?: OrderStatus,
  search?: string,
): Promise<OrderAdminResponse> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(status && { status }),
      ...(search && { search }),
    })

    const response = await fetch(`${ORDERS_ENDPOINT}?${params}`, {
      method: "GET",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al obtener pedidos:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Obtiene un pedido por su ID
 */
export const getOrderById = async (id: string): Promise<OrderAdminResponse> => {
  try {
    const response = await fetch(`${ORDERS_ENDPOINT}/${id}`, {
      method: "GET",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al obtener pedido:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Actualiza el estado de un pedido
 *
 * @param id - ID del pedido
 * @param data - Nuevo estado y notas opcionales
 * @returns Promise con el pedido actualizado
 *
 * EJEMPLO DE USO:
 * ```typescript
 * const updated = await updateOrderStatus('order-123', {
 *   status: 'shipped',
 *   notes: 'Enviado con courier XYZ, tracking: 123456'
 * })
 * ```
 */
export const updateOrderStatus = async (id: string, data: UpdateOrderStatusRequest): Promise<OrderAdminResponse> => {
  try {
    const response = await fetch(`${ORDERS_ENDPOINT}/${id}/status`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al actualizar estado del pedido:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Obtiene estadísticas de pedidos
 *
 * @returns Promise con estadísticas (total, por estado, ingresos, etc.)
 */
export const getOrderStats = async (): Promise<OrderAdminResponse> => {
  try {
    const response = await fetch(`${ORDERS_ENDPOINT}/stats`, {
      method: "GET",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al obtener estadísticas de pedidos:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}
