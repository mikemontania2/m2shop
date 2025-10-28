// ========================================
// USUARIO
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

// ========================================
// RESPUESTAS DE API
// ========================================

export interface AuthResponse {
  mensaje: string;
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse extends AuthResponse {}

export interface RegisterRequest {
  email: string;
  password: string;
  nombre: string;
  telefono?: string;
  direccion?: string;
  tipoDocumento?: 'ci' | 'ruc' | 'ninguno';
  documento?: string;
}

export interface RegisterResponse extends AuthResponse {}

export interface RenewTokenResponse extends AuthResponse {}

// ========================================
// PERFIL
// ========================================

export interface ProfileResponse {
  user: User;
}

export interface ProfileUpdateRequest {
  nombre?: string;
  telefono?: string;
  direccion?: string;
  tipoDocumento?: 'ci' | 'ruc' | 'ninguno';
  documento?: string;
}

export interface ProfileUpdateResponse {
  mensaje: string;
  user: User;
}

// ========================================
// CONTRASEÑA
// ========================================

export interface PasswordUpdateRequest {
  passwordActual: string;
  passwordNuevo: string;
}

export interface PasswordUpdateResponse {
  mensaje: string;
}

export interface PasswordResetRequest {
  email: string;
  passwordNuevo: string;
}

export interface PasswordResetResponse {
  mensaje: string;
}

// ========================================
// ERRORES
// ========================================

export interface AuthError {
  error: string;
  intentosRestantes?: number;
}

// ========================================
// ESTADOS DE SERVICIO
// ========================================

export interface AuthServiceResult<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginResult {
  success: boolean;
  user?: User;
  message?: string;
}

export interface RegisterResult {
  success: boolean;
  user?: User;
  message?: string;
}

// ========================================
// CONTEXTO DE APLICACIÓN
// ========================================

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  register: (email: string, password: string, nombre: string) => Promise<RegisterResult>;
  logout: () => void;
  updateProfile: (data: ProfileUpdateRequest) => Promise<AuthServiceResult<User>>;
  renewToken: () => Promise<void>;
}

// ========================================
// GUARDS Y ROLES
// ========================================

export type UserRole = 'cliente' | 'admin' | 'vendedor';

export interface RoleGuard {
  allowedRoles: UserRole[];
  redirectTo?: string;
}

// ========================================
// TOKENS
// ========================================

export interface JWTPayload {
  user: User;
  iat: number;
  exp: number;
}

export interface TokenData {
  token: string;
  expiresIn: string;
}

// ========================================
// VALIDACIONES
// ========================================

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidation {
  isValid: boolean;
  errors: ValidationError[];
}

// ========================================
// ESTADOS DE FORMULARIOS
// ========================================

export interface LoginFormState {
  email: string;
  password: string;
}

export interface RegisterFormState {
  nombre: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ProfileFormState {
  nombre: string;
  telefono: string;
  direccion: string;
  tipoDocumento: 'ci' | 'ruc' | 'ninguno';
  documento: string;
}

export interface PasswordFormState {
  passwordActual: string;
  passwordNuevo: string;
  confirmarPasswordNuevo: string;
}