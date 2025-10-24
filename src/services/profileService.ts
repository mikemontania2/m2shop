/**
 * SERVICIO DE PERFIL DE USUARIO
 *
 * Maneja operaciones relacionadas con el perfil del usuario,
 * direcciones guardadas y tarjetas de pago.
 *
 * PREPARADO PARA INTEGRACIÓN CON BACKEND:
 * - Las interfaces están en src/types/profile.types.ts
 * - Solo necesitas descomentar las secciones de API
 */

import type { UpdateProfileRequest, Address, SavedCard, ProfileResponse } from "../types/profile.types"
import authService from "./authService"

// CONFIGURACIÓN DEL API (descomentar cuando tengas el backend)
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ProfileService {
  /**
   * Obtiene el perfil completo del usuario actual
   * Incluye datos personales, direcciones y tarjetas guardadas
   *
   * INTEGRACIÓN CON BACKEND:
   * GET /api/profile
   * Response: ProfileResponse
   */
  async getProfile(): Promise<ProfileResponse> {
    // TODO: Descomentar cuando tengas el backend
    // const response = await fetch(`${API_URL}/profile`, {
    //   credentials: 'include'
    // });
    // return await response.json();

    // IMPLEMENTACIÓN LOCAL (actual)
    const user = authService.getCurrentUser()
    if (!user) {
      return { success: false, message: "Usuario no autenticado" }
    }

    return {
      success: true,
      profile: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address,
        documentType: user.documentType,
        documentNumber: user.documentNumber,
      },
    }
  }

  /**
   * Actualiza los datos del perfil del usuario
   *
   * @param updates - Campos a actualizar
   *
   * INTEGRACIÓN CON BACKEND:
   * PUT /api/profile
   * Body: UpdateProfileRequest
   * Response: ProfileResponse
   */
  async updateProfile(updates: UpdateProfileRequest): Promise<ProfileResponse> {
    // TODO: Descomentar cuando tengas el backend
    // const response = await fetch(`${API_URL}/profile`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updates),
    //   credentials: 'include'
    // });
    // return await response.json();

    // IMPLEMENTACIÓN LOCAL (actual)
    const result = authService.updateProfile(updates)
    return {
      success: result.success,
      message: result.message,
    }
  }

  /**
   * Obtiene todas las direcciones guardadas del usuario
   *
   * INTEGRACIÓN CON BACKEND:
   * GET /api/profile/addresses
   * Response: { success: boolean, addresses: Address[] }
   */
  async getAddresses(): Promise<Address[]> {
    // TODO: Descomentar cuando tengas el backend
    // const response = await fetch(`${API_URL}/profile/addresses`, {
    //   credentials: 'include'
    // });
    // const data = await response.json();
    // return data.addresses;

    // IMPLEMENTACIÓN LOCAL (actual)
    const saved = localStorage.getItem("userAddresses")
    return saved ? JSON.parse(saved) : []
  }

  /**
   * Guarda o actualiza una dirección
   *
   * @param address - Dirección a guardar
   *
   * INTEGRACIÓN CON BACKEND:
   * POST /api/profile/addresses (para nueva)
   * PUT /api/profile/addresses/:id (para actualizar)
   */
  async saveAddress(address: Address): Promise<void> {
    // TODO: Descomentar cuando tengas el backend
    // const method = address.id ? 'PUT' : 'POST';
    // const url = address.id
    //   ? `${API_URL}/profile/addresses/${address.id}`
    //   : `${API_URL}/profile/addresses`;
    //
    // await fetch(url, {
    //   method,
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(address),
    //   credentials: 'include'
    // });

    // IMPLEMENTACIÓN LOCAL (actual)
    const addresses = await this.getAddresses()
    const index = addresses.findIndex((a) => a.id === address.id)

    if (index >= 0) {
      addresses[index] = address
    } else {
      addresses.push(address)
    }

    localStorage.setItem("userAddresses", JSON.stringify(addresses))
  }

  /**
   * Elimina una dirección guardada
   *
   * @param addressId - ID de la dirección a eliminar
   *
   * INTEGRACIÓN CON BACKEND:
   * DELETE /api/profile/addresses/:id
   */
  async deleteAddress(addressId: string): Promise<void> {
    // TODO: Descomentar cuando tengas el backend
    // await fetch(`${API_URL}/profile/addresses/${addressId}`, {
    //   method: 'DELETE',
    //   credentials: 'include'
    // });

    // IMPLEMENTACIÓN LOCAL (actual)
    const addresses = await this.getAddresses()
    const filtered = addresses.filter((a) => a.id !== addressId)
    localStorage.setItem("userAddresses", JSON.stringify(filtered))
  }

  /**
   * Obtiene todas las tarjetas guardadas del usuario
   * NOTA: Solo se guardan los últimos 4 dígitos por seguridad
   *
   * INTEGRACIÓN CON BACKEND:
   * GET /api/profile/cards
   * Response: { success: boolean, cards: SavedCard[] }
   */
  async getCards(): Promise<SavedCard[]> {
    // TODO: Descomentar cuando tengas el backend
    // const response = await fetch(`${API_URL}/profile/cards`, {
    //   credentials: 'include'
    // });
    // const data = await response.json();
    // return data.cards;

    // IMPLEMENTACIÓN LOCAL (actual)
    const saved = localStorage.getItem("userCards")
    return saved ? JSON.parse(saved) : []
  }

  /**
   * Guarda o actualiza una tarjeta
   * IMPORTANTE: Nunca guardes el número completo de la tarjeta en el frontend
   *
   * @param card - Tarjeta a guardar (solo últimos 4 dígitos)
   *
   * INTEGRACIÓN CON BACKEND:
   * POST /api/profile/cards (para nueva)
   * PUT /api/profile/cards/:id (para actualizar)
   */
  async saveCard(card: SavedCard): Promise<void> {
    // TODO: Descomentar cuando tengas el backend
    // const method = card.id ? 'PUT' : 'POST';
    // const url = card.id
    //   ? `${API_URL}/profile/cards/${card.id}`
    //   : `${API_URL}/profile/cards`;
    //
    // await fetch(url, {
    //   method,
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(card),
    //   credentials: 'include'
    // });

    // IMPLEMENTACIÓN LOCAL (actual)
    const cards = await this.getCards()
    const index = cards.findIndex((c) => c.id === card.id)

    if (index >= 0) {
      cards[index] = card
    } else {
      cards.push(card)
    }

    localStorage.setItem("userCards", JSON.stringify(cards))
  }

  /**
   * Elimina una tarjeta guardada
   *
   * @param cardId - ID de la tarjeta a eliminar
   *
   * INTEGRACIÓN CON BACKEND:
   * DELETE /api/profile/cards/:id
   */
  async deleteCard(cardId: string): Promise<void> {
    // TODO: Descomentar cuando tengas el backend
    // await fetch(`${API_URL}/profile/cards/${cardId}`, {
    //   method: 'DELETE',
    //   credentials: 'include'
    // });

    // IMPLEMENTACIÓN LOCAL (actual)
    const cards = await this.getCards()
    const filtered = cards.filter((c) => c.id !== cardId)
    localStorage.setItem("userCards", JSON.stringify(filtered))
  }
}

export default new ProfileService()
