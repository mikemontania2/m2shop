import React from 'react';
import { Navigate, useLocation } from 'react-router-dom'; 
import { useApp } from './contexts/AppContext';  
import authService from './services/auth.service';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireRole?: 'admin' | 'vendedor' | 'cliente';
  redirectTo?: string;
}

/**
 * Componente para proteger rutas que requieren autenticación
 * o roles específicos
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireRole,
  redirectTo = '/login'
}) => {
  const { isAuthenticated } = useApp();
  const location = useLocation();

  // Si requiere autenticación y no está autenticado
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Si requiere un rol específico
  if (requireRole && !authService.hasRole(requireRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;


// ========================================
// ProtectedAdminRoute.tsx - Específico para Admin
// ========================================

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const location = useLocation();

  if (!authService.isAuthenticated() || !authService.isAdmin()) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};


// ========================================
// RoleBasedRoute.tsx - Múltiples roles permitidos
// ========================================

interface RoleBasedRouteProps {
  children: React.ReactNode;
  allowedRoles: ('admin' | 'vendedor' | 'cliente')[];
  redirectTo?: string;
}

export const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  children,
  allowedRoles,
  redirectTo = '/'
}) => {
  const { user, isAuthenticated } = useApp();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user || !allowedRoles.includes(user.rol)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};


// ========================================
// GuestRoute.tsx - Solo para usuarios NO autenticados
// ========================================

interface GuestRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const GuestRoute: React.FC<GuestRouteProps> = ({
  children,
  redirectTo = '/'
}) => {
  const { isAuthenticated } = useApp();

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};


// ========================================
// AuthRedirect.tsx - Redirige según autenticación
// ========================================

interface AuthRedirectProps {
  authenticated: string;
  guest: string;
}

export const AuthRedirect: React.FC<AuthRedirectProps> = ({
  authenticated,
  guest
}) => {
  const { isAuthenticated } = useApp();

  return <Navigate to={isAuthenticated ? authenticated : guest} replace />;
};