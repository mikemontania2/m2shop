/**
 * ============================================
 * SERVICIO DE DESCUENTOS - ADMINISTRACIÓN
 * ============================================
 *
 * Gestiona las operaciones CRUD de descuentos y promociones.
 *
 * ENDPOINTS DEL BACKEND:
 * - GET    /api/admin/discounts        - Obtener todos los descuentos
 * - GET    /api/admin/discounts/:id    - Obtener un descuento por ID
 * - POST   /api/admin/discounts        - Crear nuevo descuento
 * - PUT    /api/admin/discounts/:id    - Actualizar descuento
 * - DELETE /api/admin/discounts/:id    - Eliminar descuento
 * - POST   /api/admin/discounts/validate - Validar código de cupón
 */

import type { DiscountResponse, CreateDiscountRequest, UpdateDiscountRequest } from "../../types/admin.types"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"
const DISCOUNTS_ENDPOINT = `${API_URL}/api/admin/discounts`

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
 * Obtiene todos los descuentos
 */
export const getAllDiscounts = async (): Promise<DiscountResponse> => {
  try {
    const response = await fetch(DISCOUNTS_ENDPOINT, {
      method: "GET",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al obtener descuentos:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Obtiene un descuento por su ID
 */
export const getDiscountById = async (id: string): Promise<DiscountResponse> => {
  try {
    const response = await fetch(`${DISCOUNTS_ENDPOINT}/${id}`, {
      method: "GET",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al obtener descuento:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Crea un nuevo descuento
 *
 * EJEMPLO DE USO:
 * ```typescript
 * const newDiscount = await createDiscount({
 *   name: 'Descuento de Verano',
 *   percentage: 20,
 *   active: true,
 *   productIds: [1, 2, 3],
 *   startDate: '2024-01-01',
 *   endDate: '2024-01-31',
 *   code: 'VERANO20'
 * })
 * ```
 */
export const createDiscount = async (data: CreateDiscountRequest): Promise<DiscountResponse> => {
  try {
    const response = await fetch(DISCOUNTS_ENDPOINT, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al crear descuento:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Actualiza un descuento existente
 */
export const updateDiscount = async (id: string, data: UpdateDiscountRequest): Promise<DiscountResponse> => {
  try {
    const response = await fetch(`${DISCOUNTS_ENDPOINT}/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al actualizar descuento:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Elimina un descuento
 */
export const deleteDiscount = async (id: string): Promise<DiscountResponse> => {
  try {
    const response = await fetch(`${DISCOUNTS_ENDPOINT}/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al eliminar descuento:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Valida un código de cupón
 *
 * @param code - Código del cupón a validar
 * @param cartTotal - Total del carrito (opcional, para validar monto mínimo)
 * @returns Promise con el descuento si es válido
 */
export const validateDiscountCode = async (code: string, cartTotal?: number): Promise<DiscountResponse> => {
  try {
    const response = await fetch(`${DISCOUNTS_ENDPOINT}/validate`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ code, cartTotal }),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al validar código de descuento:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}
