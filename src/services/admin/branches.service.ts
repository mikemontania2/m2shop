/**
 * ============================================
 * SERVICIO DE SUCURSALES - ADMINISTRACIÓN
 * ============================================
 *
 * Gestiona las operaciones CRUD de sucursales físicas.
 * Incluye manejo de ubicación geográfica y áreas de cobertura.
 *
 * ENDPOINTS DEL BACKEND:
 * - GET    /api/admin/branches         - Obtener todas las sucursales
 * - GET    /api/admin/branches/:id     - Obtener una sucursal por ID
 * - POST   /api/admin/branches         - Crear nueva sucursal
 * - PUT    /api/admin/branches/:id     - Actualizar sucursal
 * - DELETE /api/admin/branches/:id     - Eliminar sucursal
 */

import type { BranchResponse, CreateBranchRequest, UpdateBranchRequest } from "../../types/admin.types"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"
const BRANCHES_ENDPOINT = `${API_URL}/api/admin/branches`

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
 * Obtiene todas las sucursales
 */
export const getAllBranches = async (): Promise<BranchResponse> => {
  try {
    const response = await fetch(BRANCHES_ENDPOINT, {
      method: "GET",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al obtener sucursales:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Obtiene una sucursal por su ID
 */
export const getBranchById = async (id: string): Promise<BranchResponse> => {
  try {
    const response = await fetch(`${BRANCHES_ENDPOINT}/${id}`, {
      method: "GET",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al obtener sucursal:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Crea una nueva sucursal
 *
 * EJEMPLO DE USO:
 * ```typescript
 * const newBranch = await createBranch({
 *   name: 'Sucursal Centro',
 *   address: 'Av. Principal 123',
 *   lat: -25.2969,
 *   lng: -57.6244,
 *   phone: '+595 21 123456',
 *   coverage: [
 *     [-25.29, -57.62],
 *     [-25.30, -57.63],
 *     [-25.31, -57.62]
 *   ]
 * })
 * ```
 */
export const createBranch = async (data: CreateBranchRequest): Promise<BranchResponse> => {
  try {
    const response = await fetch(BRANCHES_ENDPOINT, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al crear sucursal:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Actualiza una sucursal existente
 */
export const updateBranch = async (id: string, data: UpdateBranchRequest): Promise<BranchResponse> => {
  try {
    const response = await fetch(`${BRANCHES_ENDPOINT}/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al actualizar sucursal:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Elimina una sucursal
 */
export const deleteBranch = async (id: string): Promise<BranchResponse> => {
  try {
    const response = await fetch(`${BRANCHES_ENDPOINT}/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al eliminar sucursal:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}
