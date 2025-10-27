/**
 * Company Service
 *
 * Gestiona la información institucional de la empresa
 * (Sobre nosotros, historia, misión, visión, etc.)
 *
 * ESTADO ACTUAL: Usa archivos JSON estáticos
 * PRÓXIMO PASO: Integrar con API REST del backend o CMS
 *
 * Endpoints sugeridos:
 * - GET /api/company/info    - Información general de la empresa
 * - GET /api/company/history - Historia de la empresa
 */

import empresa from "../data/empresa.json"
import historia from "../data/historia.json"

// Interfaz para la información general de la empresa
export interface CompanyInfo {
  title: string
  description: string
  sections: Array<{
    heading: string
    content: string
  }>
}

// Interfaz para la historia de la empresa
export interface HistoryInfo {
  title: string
  paragraphs: string[]
}

/**
 * Obtiene la información general de la empresa
 *
 * API FUTURA:
 * const response = await fetch(`${API_URL}/api/company/info`);
 * return await response.json();
 */
export const getCompanyInfo = async (): Promise<CompanyInfo> => {
  // Simula delay de red
  return new Promise((resolve) => setTimeout(() => resolve(empresa as CompanyInfo), 300))
}

/**
 * Obtiene la historia de la empresa
 *
 * API FUTURA:
 * const response = await fetch(`${API_URL}/api/company/history`);
 * return await response.json();
 */
export const getHistory = async (): Promise<HistoryInfo> => {
  // Simula delay de red
  return new Promise((resolve) => setTimeout(() => resolve(historia as HistoryInfo), 300))
}
