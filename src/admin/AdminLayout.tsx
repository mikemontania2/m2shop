import React from 'react';
import { LogOut } from 'lucide-react';
import authService from '../services/authService';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="brand">Admin Cavallaro</div>
        <nav>
          <ul>
            <li><Link to="/admin">Panel</Link></li>
            <li><Link to="/admin/products">Productos</Link></li>
            <li><Link to="/admin/categories">Categorías</Link></li>
            <li><Link to="/admin/banners">Banners</Link></li>
            <li><Link to="/admin/discounts">Descuentos</Link></li>
            <li><Link to="/admin/branches">Sucursales</Link></li>
            <li><Link to="/admin/coverage">Áreas de Cobertura</Link></li>
            <li><Link to="/admin/orders">Pedidos</Link></li>
          </ul>
        </nav>
        <button className="btn-secondary" onClick={handleLogout}>
          <LogOut size={16} /> Salir
        </button>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
