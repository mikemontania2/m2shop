import React, { useState } from 'react';
import { Package, FolderOpen, Image, LogOut } from 'lucide-react';
import authService from '../services/authService';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'banners' | 'branches' | 'coverage'>('products');
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    onLogout();
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="container">
          <div className="admin-header-content">
            <h1>Panel de Administración - CAVALLARO</h1>
            <div className="admin-user-info">
              <span>Admin: {user?.name}</span>
              <button onClick={handleLogout} className="btn-secondary">
                <LogOut size={18} />
                Salir
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="container">
          <div className="admin-tabs">
            <button
              className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <Package size={20} />
              Productos
            </button>
            <button
              className={`admin-tab ${activeTab === 'categories' ? 'active' : ''}`}
              onClick={() => setActiveTab('categories')}
            >
              <FolderOpen size={20} />
              Categorías
            </button>
            <button
              className={`admin-tab ${activeTab === 'banners' ? 'active' : ''}`}
              onClick={() => setActiveTab('banners')}
            >
              <Image size={20} />
              Banners
            </button>
            <button
              className={`admin-tab ${activeTab === 'branches' ? 'active' : ''}`}
              onClick={() => setActiveTab('branches')}
            >
              Sucursales
            </button>
            <button
              className={`admin-tab ${activeTab === 'coverage' ? 'active' : ''}`}
              onClick={() => setActiveTab('coverage')}
            >
              Cobertura
            </button>
          </div>

          <div className="admin-panel">
            {activeTab === 'products' && (
              <div className="admin-section">
                <h2>Gestión de Productos</h2>
                <p className="admin-info">
                  Para agregar, editar o eliminar productos, modifica el archivo:
                  <code>/src/data/products.json</code>
                </p>
                <div className="admin-example">
                  <h3>Estructura de un producto:</h3>
                  <pre>{`{
  "id": 1,
  "name": "Nombre del Producto",
  "category": "categoria-id",
  "price": 350000,
  "originalPrice": 450000,
  "image": "url-de-la-imagen",
  "images": ["url1", "url2"],
  "description": "Descripción del producto",
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["Color1", "Color2"],
  "featured": true,
  "stock": 50
}`}</pre>
                </div>
              </div>
            )}

            {activeTab === 'categories' && (
              <div className="admin-section">
                <h2>Gestión de Categorías</h2>
                <p className="admin-info">
                  Para agregar, editar o eliminar categorías, modifica el archivo:
                  <code>/src/data/categories.json</code>
                </p>
                <div className="admin-example">
                  <h3>Estructura de una categoría:</h3>
                  <pre>{`{
  "id": "categoria-id",
  "name": "Nombre de la Categoría",
  "description": "Descripción de la categoría",
  "image": "url-de-la-imagen"
}`}</pre>
                </div>
              </div>
            )}

            {activeTab === 'banners' && (
              <div className="admin-section">
                <h2>Gestión de Banners</h2>
                <p className="admin-info">
                  Para agregar, editar o eliminar banners, modifica el archivo:
                  <code>/src/data/banners.json</code>
                </p>
                <div className="admin-example">
                  <h3>Estructura de un banner:</h3>
                  <pre>{`{
  "id": 1,
  "title": "Título del Banner",
  "subtitle": "Subtítulo del Banner",
  "image": "url-de-la-imagen",
  "active": true,
  "order": 1
}`}</pre>
                </div>
              </div>
            )}

            {activeTab === 'branches' && (
              <div className="admin-section">
                <h2>Gestión de Sucursales</h2>
                <p className="admin-info">Puedes administrar sucursales en <code>/admin/branches</code>.</p>
              </div>
            )}

            {activeTab === 'coverage' && (
              <div className="admin-section">
                <h2>Áreas de Cobertura</h2>
                <p className="admin-info">Puedes administrar áreas en <code>/admin/coverage</code> o desde el mapa público.</p>
              </div>
            )}
          </div>

          <div className="admin-instructions">
            <h3>Instrucciones Importantes:</h3>
            <ul>
              <li>Los cambios en los archivos JSON se reflejarán inmediatamente al recargar la página</li>
              <li>Asegúrate de mantener la estructura JSON válida al editar</li>
              <li>Las IDs deben ser únicas para cada elemento</li>
              <li>Las URLs de imágenes deben ser válidas y accesibles</li>
              <li>Para desactivar un banner, cambia "active" a false</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
