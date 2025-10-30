// ========================================
// cardService.ts - Servicio de Tarjetas
// ========================================
 import { API_BASE_URL } from "../Config"
 
import axios from "axios";

export interface Card {
  id: string; 
  userId: number;
  titular: string;
  ultimos4: string;
  marca: string;
  mesVencimiento: number;
  anioVencimiento: number;
  createdAt?: string;
  updatedAt?: string;
}

class CardService {
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    };
  }

  /**
   * Obtener todas las tarjetas del usuario autenticado
   */
  async getByUser(userId: number): Promise<Card[]> {
    try {
      const response = await axios.get<{ tarjetas: Card[] }>(
        `${API_BASE_URL}/tarjetas/usuario/${userId}`,
        { headers: this.getHeaders() }
      );
      return response.data.tarjetas;
    } catch (error) {
      console.error('Error obteniendo tarjetas:', error);
      return [];
    }
  }

  /**
   * Obtener una tarjeta por ID
   */
  async getById(id: string): Promise<Card | null> {
    try {
      const response = await axios.get<{ tarjeta: Card }>(
        `${API_BASE_URL}/tarjetas/${id}`,
        { headers: this.getHeaders() }
      );
      return response.data.tarjeta;
    } catch (error) {
      console.error('Error obteniendo tarjeta:', error);
      return null;
    }
  }

  /**
   * Crear o actualizar tarjeta
   */
  async upsert(card: Card): Promise<Card | null> {
    try {
      const isNew = !card.id || card.id.startsWith('card-');
      
      if (isNew) {
        // Crear nueva tarjeta
        const response = await axios.post<{ tarjeta: Card }>(
          `${API_BASE_URL}/tarjetas`,
          card,
          { headers: this.getHeaders() }
        );
        return response.data.tarjeta;
      } else {
        // Actualizar tarjeta existente
        const response = await axios.put<{ tarjeta: Card }>(
          `${API_BASE_URL}/tarjetas/${card.id}`,
          card,
          { headers: this.getHeaders() }
        );
        return response.data.tarjeta;
      }
    } catch (error) {
      console.error('Error guardando tarjeta:', error);
      return null;
    }
  }

  /**
   * Eliminar tarjeta
   */
  async delete(id: string): Promise<boolean> {
    try {
      await axios.delete(
        `${API_BASE_URL}/tarjetas/${id}`,
        { headers: this.getHeaders() }
      );
      return true;
    } catch (error) {
      console.error('Error eliminando tarjeta:', error);
      return false;
    }
  }

  /**
   * Validar si una tarjeta está vencida
   */
  isExpired(card: Card): boolean {
    const now = new Date();
    const expiry = new Date(card.anioVencimiento, card.mesVencimiento - 1);
    return now > expiry;
  }

  /**
   * Formatear fecha de vencimiento
   */
  formatExpiry(card: Card): string {
    return `${card.mesVencimiento.toString().padStart(2, '0')}/${card.anioVencimiento}`;
  }

  /**
   * Obtener ícono de marca de tarjeta
   */
  getBrandIcon(brand: string): string {
    const icons: { [key: string]: string } = {
      'visa': '💳',
      'mastercard': '💳',
      'amex': '💳',
      'discover': '💳',
      'diners': '💳',
      'default': '💳'
    };
    return icons[brand.toLowerCase()] || icons.default;
  }

  /**
   * Formatear número de tarjeta con máscara
   */
  formatCardNumber(last4: string, brand: string = ''): string {
    return `${brand} •••• ${last4}`;
  }
}

const cardService = new CardService();
export default cardService;