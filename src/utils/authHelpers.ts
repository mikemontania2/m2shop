
// ========================================
// src/utils/authHelpers.ts - Helpers de Auth
// ========================================

import { User } from "../services/auth.service";

 
/**
 * Verifica si el usuario tiene un rol específico
 */
export const hasRole = (user: User | null, role: string): boolean => {
  return user?.rol === role;
};

/**
 * Verifica si el usuario es admin
 */
export const isAdmin = (user: User | null): boolean => {
  return hasRole(user, 'admin');
};

/**
 * Verifica si el usuario es vendedor
 */
export const isVendedor = (user: User | null): boolean => {
  return hasRole(user, 'vendedor');
};

/**
 * Verifica si el usuario es cliente
 */
export const isCliente = (user: User | null): boolean => {
  return hasRole(user, 'cliente');
};

/**
 * Obtiene el saludo según la hora del día
 */
export const getGreeting = (userName: string): string => {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return `Buenos días, ${userName}`;
  } else if (hour < 19) {
    return `Buenas tardes, ${userName}`;
  } else {
    return `Buenas noches, ${userName}`;
  }
};

/**
 * Formatea el nombre del usuario (primera letra mayúscula)
 */
export const formatUserName = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Obtiene las iniciales del usuario
 */
export const getUserInitials = (name: string): string => {
  const words = name.trim().split(' ');
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

/**
 * Formatea el tipo de documento
 */
export const formatDocumentType = (type: 'ci' | 'ruc' | 'ninguno'): string => {
  const types = {
    ci: 'Cédula de Identidad',
    ruc: 'RUC',
    ninguno: 'Sin especificar'
  };
  return types[type];
};

/**
 * Formatea el rol del usuario
 */
export const formatRole = (role: 'cliente' | 'admin' | 'vendedor'): string => {
  const roles = {
    cliente: 'Cliente',
    admin: 'Administrador',
    vendedor: 'Vendedor'
  };
  return roles[role];
};

/**
 * Verifica si el token está próximo a expirar (menos de 5 minutos)
 */
export const isTokenExpiringSoon = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000; // Convertir a milisegundos
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;
    
    // Retorna true si faltan menos de 5 minutos
    return timeUntilExpiration < 5 * 60 * 1000;
  } catch (error) {
    return true; // Si hay error al parsear, asumir que está expirado
  }
};

/**
 * Extrae el payload del JWT sin verificar
 */
export const decodeJWT = (token: string): any => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    return null;
  }
};