// ========================================
// addressService.ts - Servicio de Direcciones
// ========================================
import axios from "axios";
import { API_BASE_URL } from "../Config"
  
export interface Address {
  id: string;
  usuarioId: number;
  calle: string;
  telefono: string;
  cross: string;
  departamento: string; 
  ciudad: string;
  barrio: string;
  transversal: string;
  referencia: string;
  lat: number;
  lng: number;
  createdAt?: string;
  updatedAt?: string;
}

class AddressService {
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
   * Obtener todas las direcciones del usuario autenticado
   */
  async getByUser(userId: number): Promise<Address[]> {
    try {
      const response = await axios.get<{ direcciones: Address[] }>(
        `${API_BASE_URL}/direcciones/usuario/${userId}`,
        { headers: this.getHeaders() }
      );
      return response.data.direcciones;
    } catch (error) {
      console.error('Error obteniendo direcciones:', error);
      return [];
    }
  }

  /**
   * Obtener una dirección por ID
   */
  async getById(id: string): Promise<Address | null> {
    try {
      const response = await axios.get<{ direccion: Address }>(
        `${API_BASE_URL}/direcciones/${id}`,
        { headers: this.getHeaders() }
      );
      return response.data.direccion;
    } catch (error) {
      console.error('Error obteniendo dirección:', error);
      return null;
    }
  }

  /**
   * Crear o actualizar dirección
   */
  async upsert(address: Address): Promise<Address | null> {
    try {
      const isNew = !address.id || address.id.startsWith('addr-');
      
      if (isNew) {
        // Crear nueva dirección
        const response = await axios.post<{ direccion: Address }>( `${API_BASE_URL}/direcciones`,
          address,
          { headers: this.getHeaders() }
        );
        return response.data.direccion;
      } else {
        // Actualizar dirección existente
        const response = await axios.put<{ direccion: Address }>(
          `${API_BASE_URL}/direcciones/${address.id}`,
          address,
          { headers: this.getHeaders() }
        );
        return response.data.direccion;
      }
    } catch (error) {
      console.error('Error guardando dirección:', error);
      return null;
    }
  }

  /**
   * Eliminar dirección
   */
  async delete(id: string): Promise<boolean> {
    try {
      await axios.delete(
        `${API_BASE_URL}/direcciones/${id}`,
        { headers: this.getHeaders() }
      );
      return true;
    } catch (error) {
      console.error('Error eliminando dirección:', error);
      return false;
    }
  }
}

const addressService = new AddressService();
export default addressService;
