import api from './api';

// ========================================
// INTERFACES
// ========================================

export interface User {
  id: number;
  email: string;
  nombre: string;
  telefono?: string;
  direccion?: string;
  tipoDocumento: 'ci' | 'ruc' | 'ninguno';
  documento?: string;
  fechaNacimiento?: string;
  rol: 'cliente' | 'admin' | 'vendedor';
  emailVerificado: boolean;
  activo: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginResponse {
  mensaje: string;
  token: string;
  user: User;
}

export interface RegisterResponse {
  mensaje: string;
  token: string;
  user: User;
}

export interface ProfileUpdateData {
  nombre?: string;
  telefono?: string;
  direccion?: string;
  tipoDocumento?: 'ci' | 'ruc' | 'ninguno';
  documento?: string;
  fechaNacimiento?: string;
}

export interface PasswordUpdateData {
  passwordActual: string;
  passwordNuevo: string;
}

// ========================================
// SERVICIO DE AUTENTICACIÓN
// ========================================

class AuthService {
  // -------- Registro / Login / Logout --------
  async register(email: string, password: string, nombre: string) {
    const { data } = await api.post<RegisterResponse>('/auth/register', { email, password, nombre });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return { success: true, user: data.user };
  }

  async login(email: string, password: string) {
    const { data } = await api.post<LoginResponse>('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return { success: true, user: data.user };
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
  }

  // -------- Sesión / Token / Perfil --------
  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!(localStorage.getItem('token') && localStorage.getItem('user'));
  }

  async renewToken() {
    const { data } = await api.post<LoginResponse>('/auth/renew');
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return { success: true, user: data.user };
  }

  async getProfile() {
    const { data } = await api.get<{ user: User }>('/auth/profile');
    localStorage.setItem('user', JSON.stringify(data.user));
    return { success: true, user: data.user };
  }

  async updateProfile(data: ProfileUpdateData) {
    const res = await api.put<{ mensaje: string; user: User }>('/auth/profile', data);
    localStorage.setItem('user', JSON.stringify(res.data.user));
       return { success: true, message: res.data.mensaje };

  }

  async updatePassword(data: PasswordUpdateData) {
    const res = await api.put<{ mensaje: string }>('/auth/update-password', data);
    return { success: true, message: res.data.mensaje };
  }

  async resetPassword(email: string, passwordNuevo: string) {
    const res = await api.post<{ mensaje: string }>('/auth/reset-password', { email, passwordNuevo });
    return { success: true, message: res.data.mensaje };
  }

  // -------- Roles --------
  hasRole(role: 'cliente' | 'admin' | 'vendedor') {
    const user = this.getCurrentUser();
    return user?.rol === role;
  }

  isAdmin() { return this.hasRole('admin'); }
  isVendedor() { return this.hasRole('vendedor'); }

  // -------- Administración de usuarios --------
  async getUsers(params?: { page?: number; limit?: number; rol?: string; activo?: boolean; buscar?: string; }) {
    const { data } = await api.get('/auth/users', { params });
    return { success: true, data };
  }

  async getUserById(id: number) {
    const { data } = await api.get<{ usuario: User }>(`/auth/users/${id}`);
    return { success: true, user: data.usuario };
  }

  async updateUser(id: number, payload: Partial<User>) {
    const { data } = await api.put<{ mensaje: string; usuario: User }>(`/auth/users/${id}`, payload);
    return { success: true, user: data.usuario };
  }

  async toggleUserStatus(id: number) {
    const { data } = await api.put<{ mensaje: string }>(`/auth/users/${id}/toggle-status`);
    return { success: true, message: data.mensaje };
  }

  async unlockUser(id: number) {
    const { data } = await api.put<{ mensaje: string }>(`/auth/users/${id}/unlock`);
    return { success: true, message: data.mensaje };
  }

  async deleteUser(id: number) {
    const { data } = await api.delete<{ mensaje: string }>(`/auth/users/${id}`);
    return { success: true, message: data.mensaje };
  }
}

export default new AuthService();
