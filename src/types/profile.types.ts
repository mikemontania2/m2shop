/**
 * TIPOS E INTERFACES PARA PERFIL DE USUARIO
 *
 * Define las interfaces para gestión de perfil, direcciones y tarjetas.
 */

/**
 * UserProfile - Información completa del perfil del usuario
 */
export interface UserProfile {
  id: number
  email: string
  name: string
  phone: string
  address: string
  documentType: "ci" | "ruc" | "none"
  documentNumber: string
  avatar?: string
  createdAt?: string
}

/**
 * UpdateProfileRequest - Datos para actualizar el perfil
 */
export interface UpdateProfileRequest {
  name?: string
  phone?: string
  address?: string
  documentType?: "ci" | "ruc" | "none"
  documentNumber?: string
  avatar?: string
}

/**
 * Address - Dirección guardada del usuario
 */
export interface Address {
  id: string
  userId: number
  label?: string // ej: "Casa", "Trabajo", "Casa de mamá"
  street: string
  number: string
  cross?: string // Calle transversal
  neighborhood: string
  city: string
  reference?: string
  lat?: number
  lng?: number
  isDefault?: boolean
}

/**
 * SavedCard - Tarjeta guardada del usuario (solo últimos 4 dígitos)
 */
export interface SavedCard {
  id: string
  userId: number
  holder: string
  last4: string
  brand: string // Visa, MasterCard, etc.
  expMonth: number
  expYear: number
  isDefault?: boolean
}

/**
 * ProfileResponse - Respuesta del backend con datos del perfil
 */
export interface ProfileResponse {
  success: boolean
  profile?: UserProfile
  addresses?: Address[]
  cards?: SavedCard[]
  message?: string
}
