/**
 * Banner Service
 *
 * Gestiona los banners del sitio (carruseles, promociones, etc.)
 *
 * ESTADO ACTUAL: Usa localStorage como almacenamiento temporal
 * PRÓXIMO PASO: Integrar con API REST del backend
 *
 * Endpoints sugeridos:
 * - GET    /api/banners          - Obtener banners activos
 * - GET    /api/admin/banners    - Obtener todos los banners (admin)
 * - POST   /api/admin/banners    - Crear nuevo banner (admin)
 * - PUT    /api/admin/banners/:id - Actualizar banner (admin)
 * - DELETE /api/admin/banners/:id - Eliminar banner (admin)
 */

import bannersData from "../data/banners.json"

// Interfaz que define la estructura de un banner
export interface Banner {
  id: number
  title: string // Título principal del banner
  subtitle: string // Subtítulo o descripción
  image: string // URL de la imagen del banner
  url: string // URL de destino al hacer clic
  active: boolean // Si el banner está activo o no
  order: number // Orden de visualización (menor = primero)
}

// Interfaz para crear un nuevo banner (sin ID)
export interface CreateBannerRequest {
  title: string
  subtitle: string
  image: string
  url: string
  active: boolean
  order: number
}

// Interfaz para actualizar un banner existente
export interface UpdateBannerRequest {
  title?: string
  subtitle?: string
  image?: string
  url?: string
  active?: boolean
  order?: number
}

class BannerService {
  // MÉTODO TEMPORAL: Lee banners de localStorage o JSON inicial
  private readAll(): Banner[] {
    const saved = localStorage.getItem("banners")
    return saved ? (JSON.parse(saved) as Banner[]) : (bannersData as Banner[])
  }

  // MÉTODO TEMPORAL: Guarda banners en localStorage
  private writeAll(list: Banner[]): void {
    localStorage.setItem("banners", JSON.stringify(list))
  }

  /**
   * Obtiene todos los banners activos ordenados
   *
   * API FUTURA:
   * const response = await fetch(`${API_URL}/api/banners`);
   * return await response.json();
   */
  getBanners(): Banner[] {
    return this.readAll()
      .filter((b) => b.active)
      .sort((a, b) => a.order - b.order)
  }

  /**
   * Obtiene todos los banners (incluidos inactivos) - Solo admin
   *
   * API FUTURA:
   * const response = await fetch(`${API_URL}/api/admin/banners`, {
   *   headers: { 'Authorization': `Bearer ${token}` }
   * });
   * return await response.json();
   */
  getAllBanners(): Banner[] {
    return this.readAll()
  }

  /**
   * Obtiene un banner por ID
   *
   * API FUTURA:
   * const response = await fetch(`${API_URL}/api/admin/banners/${id}`, {
   *   headers: { 'Authorization': `Bearer ${token}` }
   * });
   * return await response.json();
   */
  getBannerById(id: number): Banner | undefined {
    return this.readAll().find((b) => b.id === id)
  }

  /**
   * Crea o actualiza un banner
   *
   * API FUTURA (Crear):
   * const response = await fetch(`${API_URL}/api/admin/banners`, {
   *   method: 'POST',
   *   headers: {
   *     'Content-Type': 'application/json',
   *     'Authorization': `Bearer ${token}`
   *   },
   *   body: JSON.stringify(banner)
   * });
   * return await response.json();
   *
   * API FUTURA (Actualizar):
   * const response = await fetch(`${API_URL}/api/admin/banners/${banner.id}`, {
   *   method: 'PUT',
   *   headers: {
   *     'Content-Type': 'application/json',
   *     'Authorization': `Bearer ${token}`
   *   },
   *   body: JSON.stringify(banner)
   * });
   * return await response.json();
   */
  upsertBanner(banner: Banner): void {
    const list = this.readAll()
    const idx = list.findIndex((b) => b.id === banner.id)
    if (idx >= 0) {
      list[idx] = banner
    } else {
      list.push(banner)
    }
    this.writeAll(list)
  }

  /**
   * Elimina un banner por ID
   *
   * API FUTURA:
   * const response = await fetch(`${API_URL}/api/admin/banners/${id}`, {
   *   method: 'DELETE',
   *   headers: { 'Authorization': `Bearer ${token}` }
   * });
   * return await response.json();
   */
  deleteBanner(id: number): void {
    const list = this.readAll().filter((b) => b.id !== id)
    this.writeAll(list)
  }
}

export default new BannerService()
