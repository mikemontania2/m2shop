/**
 * ============================================
 * SERVICIO DE PRODUCTOS - ADMINISTRACIÓN
 * ============================================
 *
 * Gestiona las operaciones CRUD de productos desde el panel de administración.
 *
 * ENDPOINTS DEL BACKEND:
 * - GET    /api/admin/products           - Obtener todos los productos
 * - GET    /api/admin/products/:id       - Obtener un producto por ID
 * - POST   /api/admin/products           - Crear nuevo producto
 * - PUT    /api/admin/products/:id       - Actualizar producto
 * - DELETE /api/admin/products/:id       - Eliminar producto
 * - POST   /api/admin/products/bulk      - Importación masiva de productos
 */

import type { ProductAdminResponse, CreateProductRequest, UpdateProductRequest } from "../../types/admin.types"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"
const PRODUCTS_ENDPOINT = `${API_URL}/api/admin/products`

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
 * Obtiene todos los productos (admin)
 *
 * @param page - Número de página (opcional)
 * @param limit - Cantidad de productos por página (opcional)
 * @param category - Filtrar por categoría (opcional)
 * @returns Promise con la lista de productos
 */
export const getAllProducts = async (
  page?: number,
  limit?: number,
  category?: string,
): Promise<ProductAdminResponse> => {
  try {
    const params = new URLSearchParams()
    if (page) params.append("page", page.toString())
    if (limit) params.append("limit", limit.toString())
    if (category) params.append("category", category)

    const url = params.toString() ? `${PRODUCTS_ENDPOINT}?${params}` : PRODUCTS_ENDPOINT

    const response = await fetch(url, {
      method: "GET",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al obtener productos:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Obtiene un producto por su ID
 */
export const getProductById = async (id: number): Promise<ProductAdminResponse> => {
  try {
    const response = await fetch(`${PRODUCTS_ENDPOINT}/${id}`, {
      method: "GET",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al obtener producto:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Crea un nuevo producto
 *
 * EJEMPLO DE USO:
 * ```typescript
 * const newProduct = await createProduct({
 *   name: 'Jabón Líquido',
 *   category: 'limpieza',
 *   price: 25000,
 *   stock: 100,
 *   image: 'https://example.com/jabon.jpg',
 *   description: 'Jabón líquido para manos',
 *   attributes: [
 *     { name: 'Presentación', values: ['500ml', '1L'] },
 *     { name: 'Fragancia', values: ['Lavanda', 'Limón'] }
 *   ]
 * })
 * ```
 */
export const createProduct = async (data: CreateProductRequest): Promise<ProductAdminResponse> => {
  try {
    const response = await fetch(PRODUCTS_ENDPOINT, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al crear producto:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Actualiza un producto existente
 */
export const updateProduct = async (id: number, data: UpdateProductRequest): Promise<ProductAdminResponse> => {
  try {
    const response = await fetch(`${PRODUCTS_ENDPOINT}/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al actualizar producto:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Elimina un producto
 */
export const deleteProduct = async (id: number): Promise<ProductAdminResponse> => {
  try {
    const response = await fetch(`${PRODUCTS_ENDPOINT}/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al eliminar producto:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

/**
 * Importación masiva de productos desde un archivo CSV o JSON
 *
 * @param file - Archivo con los productos a importar
 * @returns Promise con el resultado de la importación
 */
export const bulkImportProducts = async (file: File): Promise<ProductAdminResponse> => {
  try {
    const formData = new FormData()
    formData.append("file", file)

    const token = getAuthToken()
    const response = await fetch(`${PRODUCTS_ENDPOINT}/bulk`, {
      method: "POST",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al importar productos:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}
