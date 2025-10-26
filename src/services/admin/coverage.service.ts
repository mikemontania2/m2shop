/**
 * ============================================
 * SERVICIO DE ÁREAS DE COBERTURA - ADMINISTRACIÓN
 * ============================================
 *
 * Gestiona las operaciones CRUD de áreas de cobertura para delivery.
 *
 * ENDPOINTS DEL BACKEND:
 * - GET    /api/admin/coverage          - Obtener todas las áreas
 * - GET    /api/admin/coverage/:id      - Obtener un área por ID
 * - POST   /api/admin/coverage          - Crear nueva área
 * - PUT    /api/admin/coverage/:id      - Actualizar área
 * - DELETE /api/admin/coverage/:id      - Eliminar área
 * - POST   /api/admin/coverage/check    - Verificar si una ubicación está cubierta
 */

import type { CoverageResponse, CreateCoverageRequest, UpdateCoverageRequest } from "../../types/admin.types"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"
const COVERAGE_ENDPOINT = `${API_URL}/api/admin/coverage`

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
 * Obtiene todas las áreas de cobertura
 */
export const getAllCoverageAreas = async (): Promise<CoverageResponse> => {
  try {
    const response = await fetch(COVERAGE_ENDPOINT, {
      method: "GET",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al obtener áreas de cobertura:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Obtiene un área de cobertura por su ID
 */
export const getCoverageAreaById = async (id: string): Promise<CoverageResponse> => {
  try {
    const response = await fetch(`${COVERAGE_ENDPOINT}/${id}`, {
      method: "GET",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al obtener área de cobertura:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Crea una nueva área de cobertura
 *
 * EJEMPLO DE USO:
 * ```typescript
 * const newArea = await createCoverageArea({
 *   name: 'Zona Centro',
 *   coordinates: [
 *     [-25.29, -57.62],
 *     [-25.30, -57.63],
 *     [-25.31, -57.62]
 *   ],
 *   deliveryCost: 15000,
 *   deliveryTime: '30-45 minutos',
 *   color: '#2f86eb'
 * })
 * ```
 */
export const createCoverageArea = async (data: CreateCoverageRequest): Promise<CoverageResponse> => {
  try {
    const response = await fetch(COVERAGE_ENDPOINT, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al crear área de cobertura:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Actualiza un área de cobertura existente
 */
export const updateCoverageArea = async (id: string, data: UpdateCoverageRequest): Promise<CoverageResponse> => {
  try {
    const response = await fetch(`${COVERAGE_ENDPOINT}/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al actualizar área de cobertura:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Elimina un área de cobertura
 */
export const deleteCoverageArea = async (id: string): Promise<CoverageResponse> => {
  try {
    const response = await fetch(`${COVERAGE_ENDPOINT}/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al eliminar área de cobertura:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Verifica si una ubicación está dentro de alguna área de cobertura
 *
 * @param lat - Latitud
 * @param lng - Longitud
 * @returns Promise con el área de cobertura si está cubierta
 */
export const checkCoverage = async (lat: number, lng: number): Promise<CoverageResponse> => {
  try {
    const response = await fetch(`${COVERAGE_ENDPOINT}/check`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ lat, lng }),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al verificar cobertura:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}
