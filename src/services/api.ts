import axios from 'axios';
import { API_BASE_URL } from "../Config";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }, 
});

// 🔧 Helper para obtener sessionId (asegura que siempre existe uno)
const getOrCreateSessionId = (): string => {
  let sessionId = localStorage.getItem('sessionId');
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('sessionId', sessionId);
    console.log('🆕 Nuevo sessionId generado:', sessionId);
  }
  
  return sessionId;
};

// 🔧 Helper para verificar si un token está expirado (sin hacer request)
const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000; // Convertir a milisegundos
    return Date.now() >= exp;
  } catch (error) {
    return true; // Si no se puede decodificar, asumir expirado
  }
};

// ✅ REQUEST INTERCEPTOR CORREGIDO
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const sessionId = getOrCreateSessionId(); // SIEMPRE generar/obtener sessionId
    
    // ✅ CAMBIO CRÍTICO: SIEMPRE enviar sessionId, incluso con token
    config.headers['x-session-id'] = sessionId;
    
    // Si hay token Y no está expirado, enviarlo
    if (token && !isTokenExpired(token)) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔐 Request con TOKEN + sessionId:', sessionId);
    } else {
      // Si no hay token o está expirado, solo usar sessionId
      if (token) {
        // Limpiar token expirado silenciosamente
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.log('⚠️ Token expirado eliminado, usando sessionId:', sessionId);
      } else {
        console.log('🔓 Request como invitado con sessionId:', sessionId);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ RESPONSE INTERCEPTOR CORREGIDO
api.interceptors.response.use(
  (response) => {
    // Actualizar sessionId si el servidor envía uno nuevo
    const sessionIdFromHeader = response.headers['x-session-id'];
    
    if (sessionIdFromHeader) {
      const currentSessionId = localStorage.getItem('sessionId');
      
      if (currentSessionId !== sessionIdFromHeader) {
        localStorage.setItem('sessionId', sessionIdFromHeader);
        console.log('🔄 SessionId actualizado desde servidor:', sessionIdFromHeader);
      }
    }

    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      const url = error.config?.url || '';

      console.error('❌ Error Response:', { 
        url, 
        status, 
        error: data.error || data.message 
      });

      // ✅ CAMBIO CRÍTICO: NO redirigir automáticamente en 401
      if (status === 401) {
        // Solo limpiar credenciales, no redirigir
        const token = localStorage.getItem('token');
        
        if (token) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          console.log('🔓 Token inválido eliminado, continuando como invitado');
        }
        
        // ✅ Solo redirigir si es una ruta protegida explícitamente
        // (El componente ProtectedRoute se encargará del redirect)
        if (url.includes('/auth/profile') || url.includes('/auth/renew')) {
          console.log('⚠️ Ruta protegida falló, usuario debe volver a login');
        }
      }

      if (status === 403) {
        console.warn('⛔ Acceso denegado');
      }
      
      if (status === 429) {
        console.warn('⏱️ Demasiadas peticiones, intenta más tarde');
      }
    } else if (error.request) {
      console.error('❌ No response from server:', error.message);
    } else {
      console.error('❌ Request error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;