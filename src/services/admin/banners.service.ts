/**
 * ============================================
 * SERVICIO DE BANNERS - ADMINISTRACIÓN
 * ============================================
 *
 * Gestiona las operaciones CRUD de banners del carrusel principal.
 *
 * ENDPOINTS DEL BACKEND:
 * - GET    /api/admin/banners          - Obtener todos los banners
 * - GET    /api/admin/banners/:id      - Obtener un banner por ID
 * - POST   /api/admin/banners          - Crear nuevo banner
 * - PUT    /api/admin/banners/:id      - Actualizar banner
 * - DELETE /api/admin/banners/:id      - Eliminar banner
 *
 * AUTENTICACIÓN:
 * Todas las peticiones requieren token de admin en el header:
 * Authorization: Bearer <token>
 */

import type { BannerResponse, CreateBannerRequest, UpdateBannerRequest } from "../../types/admin.types"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"
const BANNERS_ENDPOINT = `${API_URL}/api/admin/banners`

/**
 * Obtiene el token de autenticación del localStorage
 * @returns Token de admin o null si no existe
 */
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

/**
 * Headers comunes para todas las peticiones
 */
const getHeaders = (): HeadersInit => {
  const token = getAuthToken()
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

/**
 * Obtiene todos los banners
 *
 * @returns Promise con la lista de banners
 *
 * EJEMPLO DE USO:
 * ```typescript
 * const banners = await getAllBanners()
 * if (banners.success) {
 *   console.log(banners.banners)
 * }
 * ```
 */
export const getAllBanners = async (): Promise<BannerResponse> => {
  try {
    const response = await fetch(BANNERS_ENDPOINT, {
      method: "GET",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al obtener banners:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Obtiene un banner por su ID
 *
 * @param id - ID del banner
 * @returns Promise con el banner encontrado
 */
export const getBannerById = async (id: number): Promise<BannerResponse> => {
  try {
    const response = await fetch(`${BANNERS_ENDPOINT}/${id}`, {
      method: "GET",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al obtener banner:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Crea un nuevo banner
 *
 * @param data - Datos del nuevo banner
 * @returns Promise con el banner creado
 *
 * EJEMPLO DE USO:
 * ```typescript
 * const newBanner = await createBanner({
 *   title: 'Promoción de Verano',
 *   subtitle: 'Hasta 50% de descuento',
 *   image: 'https://example.com/banner.jpg',
 *   active: true,
 *   order: 1
 * })
 * ```
 */
export const createBanner = async (data: CreateBannerRequest): Promise<BannerResponse> => {
  try {
    const response = await fetch(BANNERS_ENDPOINT, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al crear banner:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Actualiza un banner existente
 *
 * @param id - ID del banner a actualizar
 * @param data - Datos a actualizar
 * @returns Promise con el banner actualizado
 */
export const updateBanner = async (id: number, data: UpdateBannerRequest): Promise<BannerResponse> => {
  try {
    const response = await fetch(`${BANNERS_ENDPOINT}/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al actualizar banner:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Elimina un banner
 *
 * @param id - ID del banner a eliminar
 * @returns Promise con el resultado de la operación
 */
export const deleteBanner = async (id: number): Promise<BannerResponse> => {
  try {
    const response = await fetch(`${BANNERS_ENDPOINT}/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al eliminar banner:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Reordena los banners
 *
 * @param bannerIds - Array de IDs en el nuevo orden
 * @returns Promise con el resultado de la operación
 */
export const reorderBanners = async (bannerIds: number[]): Promise<BannerResponse> => {
  try {
    const response = await fetch(`${BANNERS_ENDPOINT}/reorder`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({ bannerIds }),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al reordenar banners:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}
