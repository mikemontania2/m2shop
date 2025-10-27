/**
 * Address Service
 *
 * Gestiona las direcciones de entrega de los usuarios
 *
 * ESTADO ACTUAL: Usa localStorage como almacenamiento temporal
 * PRÓXIMO PASO: Integrar con API REST del backend
 *
 * Endpoints sugeridos:
 * - GET    /api/users/:userId/addresses     - Obtener direcciones del usuario
 * - POST   /api/users/:userId/addresses     - Crear nueva dirección
 * - PUT    /api/users/:userId/addresses/:id - Actualizar dirección
 * - DELETE /api/users/:userId/addresses/:id - Eliminar dirección
 */

import addressesData from "../data/addresses.json"

// Interfaz que define la estructura de una dirección
export interface Address {
  id: string
  userId: number // ID del usuario propietario
  street: string // Nombre de la calle
  number: string // Número de casa/edificio
  cross: string // Calle de referencia/cruce
  city: string // Ciudad
  neighborhood: string // Barrio
  reference: string // Referencias adicionales
  lat?: number // Latitud (opcional, para mapas)
  lng?: number // Longitud (opcional, para mapas)
}

// Interfaz para crear una nueva dirección (sin ID)
export interface CreateAddressRequest {
  userId: number
  street: string
  number: string
  cross: string
  city: string
  neighborhood: string
  reference: string
  lat?: number
  lng?: number
}

// Interfaz para actualizar una dirección existente
export interface UpdateAddressRequest {
  street?: string
  number?: string
  cross?: string
  city?: string
  neighborhood?: string
  reference?: string
  lat?: number
  lng?: number
}

class AddressService {
  // MÉTODO TEMPORAL: Lee direcciones de localStorage o JSON inicial
  private read(): Address[] {
    const saved = localStorage.getItem("addresses")
    return saved ? (JSON.parse(saved) as Address[]) : (addressesData as Address[])
  }

  // MÉTODO TEMPORAL: Guarda direcciones en localStorage
  private write(list: Address[]): void {
    localStorage.setItem("addresses", JSON.stringify(list))
  }

  /**
   * Obtiene todas las direcciones de un usuario
   *
   * API FUTURA:
   * const response = await fetch(`${API_URL}/api/users/${userId}/addresses`, {
   *   headers: { 'Authorization': `Bearer ${token}` }
   * });
   * return await response.json();
   */
  getByUser(userId: number): Address[] {
    return this.read().filter((a) => a.userId === userId)
  }

  /**
   * Crea o actualiza una dirección
   *
   * API FUTURA (Crear):
   * const response = await fetch(`${API_URL}/api/users/${address.userId}/addresses`, {
   *   method: 'POST',
   *   headers: {
   *     'Content-Type': 'application/json',
   *     'Authorization': `Bearer ${token}`
   *   },
   *   body: JSON.stringify(address)
   * });
   * return await response.json();
   *
   * API FUTURA (Actualizar):
   * const response = await fetch(`${API_URL}/api/users/${address.userId}/addresses/${address.id}`, {
   *   method: 'PUT',
   *   headers: {
   *     'Content-Type': 'application/json',
   *     'Authorization': `Bearer ${token}`
   *   },
   *   body: JSON.stringify(address)
   * });
   * return await response.json();
   */
  upsert(address: Address): void {
    const list = this.read()
    const idx = list.findIndex((a) => a.id === address.id)
    if (idx >= 0) {
      list[idx] = address
    } else {
      list.push(address)
    }
    this.write(list)
  }

  /**
   * Elimina una dirección por ID
   *
   * API FUTURA:
   * const response = await fetch(`${API_URL}/api/users/${userId}/addresses/${id}`, {
   *   method: 'DELETE',
   *   headers: { 'Authorization': `Bearer ${token}` }
   * });
   * return await response.json();
   */
  delete(id: string): void {
    this.write(this.read().filter((a) => a.id !== id))
  }
}

export default new AddressService()
