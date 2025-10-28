// ========================================
// profileService.ts - Servicio Completo de Perfil
// ========================================

 import addressService, { type Address } from './address.service';
import authService, { PasswordUpdateData, ProfileUpdateData, User } from './auth.service';
import cardService, { Card } from './card.service';
 
export interface ProfileData {
  user: User;
  addresses: Address[];
  cards: Card[];
}

export interface UpdateProfileResponse {
  success: boolean;
  message?: string;
  user?: User;
}

class ProfileService {
  /**
   * Obtiene el perfil completo del usuario
   * Incluye datos personales, direcciones y tarjetas
   */
  async getCompleteProfile(): Promise<{ success: boolean; data?: ProfileData; message?: string }> {
    try {
      const user = authService.getCurrentUser();
      
      if (!user) {
        return {
          success: false,
          message: 'Usuario no autenticado'
        };
      }

      // Cargar datos en paralelo
      const [addresses, cards] = await Promise.all([
        addressService.getByUser(user.id),
        cardService.getByUser(user.id)
      ]);

      return {
        success: true,
        data: {
          user,
          addresses,
          cards
        }
      };
    } catch (error) {
      console.error('Error obteniendo perfil completo:', error);
      return {
        success: false,
        message: 'Error al cargar el perfil'
      };
    }
  }

  /**
   * Actualiza los datos personales del usuario
   */
  async updatePersonalInfo(data: ProfileUpdateData): Promise<UpdateProfileResponse> {
    try {
      const result = await authService.updateProfile(data);
      return result;
    } catch (error) {
      console.error('Error actualizando información personal:', error);
      return {
        success: false,
        message: 'Error al actualizar información personal'
      };
    }
  }

  /**
   * Cambia la contraseña del usuario
   */
  async changePassword(data: PasswordUpdateData): Promise<{ success: boolean; message?: string }> {
    try {
      const result = await authService.updatePassword(data);
      return result;
    } catch (error) {
      console.error('Error cambiando contraseña:', error);
      return {
        success: false,
        message: 'Error al cambiar contraseña'
      };
    }
  }

  // ========================================
  // MÉTODOS DE DIRECCIONES
  // ========================================

  /**
   * Obtiene todas las direcciones del usuario
   */
  async getAddresses(): Promise<Address[]> {
    try {
      const user = authService.getCurrentUser();
      if (!user) return [];

      return await addressService.getByUser(user.id);
    } catch (error) {
      console.error('Error obteniendo direcciones:', error);
      return [];
    }
  }

  /**
   * Obtiene una dirección por ID
   */
  async getAddressById(id: string): Promise<Address | null> {
    try {
      return await addressService.getById(id);
    } catch (error) {
      console.error('Error obteniendo dirección:', error);
      return null;
    }
  }

  /**
   * Crea o actualiza una dirección
   */
  async saveAddress(address: Address): Promise<{ success: boolean; address?: Address; message?: string }> {
    try {
      const result = await addressService.upsert(address);
      
      if (result) {
        return {
          success: true,
          address: result
        };
      }
      
      return {
        success: false,
        message: 'Error al guardar la dirección'
      };
    } catch (error) {
      console.error('Error guardando dirección:', error);
      return {
        success: false,
        message: 'Error al guardar la dirección'
      };
    }
  }

  /**
   * Elimina una dirección
   */
  async deleteAddress(id: string): Promise<{ success: boolean; message?: string }> {
    try {
      const result = await addressService.delete(id);
      
      if (result) {
        return {
          success: true,
          message: 'Dirección eliminada exitosamente'
        };
      }
      
      return {
        success: false,
        message: 'Error al eliminar la dirección'
      };
    } catch (error) {
      console.error('Error eliminando dirección:', error);
      return {
        success: false,
        message: 'Error al eliminar la dirección'
      };
    }
  }

  // ========================================
  // MÉTODOS DE TARJETAS
  // ========================================

  /**
   * Obtiene todas las tarjetas del usuario
   */
  async getCards(): Promise<Card[]> {
    try {
      const user = authService.getCurrentUser();
      if (!user) return [];

      return await cardService.getByUser(user.id);
    } catch (error) {
      console.error('Error obteniendo tarjetas:', error);
      return [];
    }
  }

  /**
   * Obtiene una tarjeta por ID
   */
  async getCardById(id: string): Promise<Card | null> {
    try {
      return await cardService.getById(id);
    } catch (error) {
      console.error('Error obteniendo tarjeta:', error);
      return null;
    }
  }

  /**
   * Crea o actualiza una tarjeta
   */
  async saveCard(card: Card): Promise<{ success: boolean; card?: Card; message?: string }> {
    try {
      // Validar que la tarjeta no esté vencida
      if (cardService.isExpired(card)) {
        return {
          success: false,
          message: 'La tarjeta está vencida'
        };
      }

      const result = await cardService.upsert(card);
      
      if (result) {
        return {
          success: true,
          card: result
        };
      }
      
      return {
        success: false,
        message: 'Error al guardar la tarjeta'
      };
    } catch (error) {
      console.error('Error guardando tarjeta:', error);
      return {
        success: false,
        message: 'Error al guardar la tarjeta'
      };
    }
  }

  /**
   * Elimina una tarjeta
   */
  async deleteCard(id: string): Promise<{ success: boolean; message?: string }> {
    try {
      const result = await cardService.delete(id);
      
      if (result) {
        return {
          success: true,
          message: 'Tarjeta eliminada exitosamente'
        };
      }
      
      return {
        success: false,
        message: 'Error al eliminar la tarjeta'
      };
    } catch (error) {
      console.error('Error eliminando tarjeta:', error);
      return {
        success: false,
        message: 'Error al eliminar la tarjeta'
      };
    }
  }

  /**
   * Valida si una tarjeta está vencida
   */
  isCardExpired(card: Card): boolean {
    return cardService.isExpired(card);
  }

  /**
   * Formatea la fecha de vencimiento de una tarjeta
   */
  formatCardExpiry(card: Card): string {
    return cardService.formatExpiry(card);
  }

  /**
   * Formatea el número de tarjeta con máscara
   */
  formatCardNumber(card: Card): string {
    return cardService.formatCardNumber(card.last4, card.brand);
  }

  // ========================================
  // MÉTODOS AUXILIARES
  // ========================================

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return authService.isAuthenticated();
  }

  /**
   * Obtiene el usuario actual
   */
  getCurrentUser(): User | null {
    return authService.getCurrentUser();
  }

  /**
   * Cierra la sesión del usuario
   */
  logout(): void {
    authService.logout();
  }

  /**
   * Refresca los datos del perfil
   */
  async refreshProfile(): Promise<{ success: boolean; user?: User; message?: string }> {
    try {
      return await authService.getProfile();
    } catch (error) {
      console.error('Error refrescando perfil:', error);
      return {
        success: false,
        message: 'Error al refrescar el perfil'
      };
    }
  }
}

// Exportar instancia única
const profileService = new ProfileService();
export default profileService;