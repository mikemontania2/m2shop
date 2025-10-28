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
    // Generar sessionId único en el cliente
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('sessionId', sessionId);
    console.log('🆕 Nuevo sessionId generado en cliente:', sessionId);
  }
  
  return sessionId;
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔐 Request con TOKEN');
    } else {
      // Solo para usuarios no autenticados, enviar sessionId
      const sessionId = getOrCreateSessionId();
      config.headers['x-session-id'] = sessionId;
      console.log('🔑 Request con sessionId:', sessionId);
    }

    console.log('📤 Request:', { 
      url: config.url, 
      method: config.method, 
      hasToken: !!token, 
      sessionId: config.headers['x-session-id']
    });

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    // Solo actualizar sessionId si viene del servidor Y no hay token
    const sessionIdFromHeader = response.headers['x-session-id'];
    const token = localStorage.getItem('token');
    
    if (sessionIdFromHeader && !token) {
      const currentSessionId = localStorage.getItem('sessionId');
      
      // Solo actualizar si es diferente (evita escrituras innecesarias)
      if (currentSessionId !== sessionIdFromHeader) {
        localStorage.setItem('sessionId', sessionIdFromHeader);
        console.log('🔄 SessionId actualizado desde servidor:', sessionIdFromHeader);
      }
    }

    console.log('📥 Response:', { 
      url: response.config.url, 
      status: response.status,
      sessionId: sessionIdFromHeader
    });

    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      console.error('❌ Error Response:', { 
        url: error.config?.url, 
        status, 
        error: data.error || data.message 
      });

      if (status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if (!error.config.url?.includes('/auth/')) {
          window.location.href = '/login';
        }
      }

      if (status === 403) console.warn('⛔ Acceso denegado');
      if (status === 429) console.warn('⏱️ Demasiadas peticiones, intenta más tarde');
    } else if (error.request) {
      console.error('❌ No response from server:', error.message);
    } else {
      console.error('❌ Request error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;