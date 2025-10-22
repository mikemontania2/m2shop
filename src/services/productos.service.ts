import { API_BASE_URL } from "../Config"; 
c
// ========== FUNCIONES AUXILIARES ==========

/**
 * Genera un slug a partir de un nombre
 */
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^a-z0-9]+/g, '-') // Reemplazar espacios y caracteres especiales con -
    .replace(/^-+|-+$/g, ''); // Remover guiones al inicio y final
};

// ========== MÉTODOS DEL SERVICIO ==========
 
 