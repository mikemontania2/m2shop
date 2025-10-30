import React from 'react';
import { Category } from '../interfaces/Categorias.interface';
import { ProductoAdmin } from '../services/admin/ProductoServices.admin';
  import "../styles/AdminProduct.css"

interface ProductListProps {
  productos: ProductoAdmin[];
  categories: Category[];
  loading: boolean;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  searchTerm: string;
  filterCategoriaId?: number;
  onSearch: (term: string) => void;
  onFilterCategory: (categoriaId: number | undefined) => void;
  onPageChange: (page: number) => void;
  onEdit: (productoId: number) => void;
  onDelete: (productoId: number) => void;
  onManageVariants: (productoId: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  productos,
  categories,
  loading,
  pagination,
  searchTerm,
  filterCategoriaId,
  onSearch,
  onFilterCategory,
  onPageChange,
  onEdit,
  onDelete,
  onManageVariants
}) => {
  return (
    <div className="product-list-container">
      {/* Filtros */}
      <div className="admin-panel filters-panel">
        <div className="filters-grid">
          <div className="filter-group">
            <label htmlFor="search">Buscar</label>
            <input
              id="search"
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="category">Filtrar por Categoría</label>
            <select
              id="category"
              value={filterCategoriaId || ''}
              onChange={(e) => onFilterCategory(e.target.value ? Number(e.target.value) : undefined)}
              className="filter-select"
            >
              <option value="">Todas las categorías</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="filter-info">
          <span className="total-results">
            {pagination.total} producto{pagination.total !== 1 ? 's' : ''} encontrado{pagination.total !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Tabla de Productos */}
      <div className="admin-panel">
        {loading ? (
          <div className="loading-state">
            <p>Cargando productos...</p>
          </div>
        ) : productos.length === 0 ? (
          <div className="empty-state">
            <p>No se encontraron productos</p>
            {searchTerm && (
              <button 
                className="btn-secondary" 
                onClick={() => onSearch('')}
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Variantes</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <tr key={producto.id}>
                      <td>#{producto.id}</td>
                      <td>
                        <div className="product-name-cell">
                          <strong>{producto.nombre}</strong>
                          <span className="slug-text">{producto.slug}</span>
                        </div>
                      </td>
                      <td>
                        <div className="category-cell">
                          <span>{producto.categoria?.nombre || 'Sin categoría'}</span>
                          {producto.subcategoria && (
                            <span className="subcategory-badge">
                              {producto.subcategoria.nombre}
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-info">
                          {producto.variantes?.length || 0} variante(s)
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${producto.activo ? 'badge-success' : 'badge-danger'}`}>
                          {producto.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn-icon btn-primary"
                            onClick={() => onManageVariants(producto.id)}
                            title="Gestionar variantes"
                          >
                            📦
                          </button>
                          <button
                            className="btn-icon btn-secondary"
                            onClick={() => onEdit(producto.id)}
                            title="Editar"
                          >
                            ✏️
                          </button>
                          <button
                            className="btn-icon btn-danger"
                            onClick={() => onDelete(producto.id)}
                            title="Eliminar"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            {pagination.totalPages > 1 && (
              <div className="pagination-container">
                <button
                  className="btn-secondary"
                  disabled={pagination.page === 1}
                  onClick={() => onPageChange(pagination.page - 1)}
                >
                  ← Anterior
                </button>

                <span className="pagination-info">
                  Página {pagination.page} de {pagination.totalPages}
                </span>

                <button
                  className="btn-secondary"
                  disabled={pagination.page === pagination.totalPages}
                  onClick={() => onPageChange(pagination.page + 1)}
                >
                  Siguiente →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        .product-list-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .filters-panel {
          padding: 1.5rem;
        }

        .filters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-group label {
          font-weight: 500;
          font-size: 0.9rem;
          color: #555;
        }

        .filter-input,
        .filter-select {
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }

        .filter-input:focus,
        .filter-select:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
        }

        .filter-info {
          padding-top: 1rem;
          border-top: 1px solid #eee;
        }

        .total-results {
          color: #666;
          font-size: 0.9rem;
        }

        .table-responsive {
          overflow-x: auto;
        }

        .product-name-cell {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .slug-text {
          font-size: 0.85rem;
          color: #888;
          font-family: monospace;
        }

        .category-cell {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .subcategory-badge {
          display: inline-block;
          padding: 0.15rem 0.5rem;
          background: #f0f0f0;
          border-radius: 12px;
          font-size: 0.75rem;
          color: #666;
          width: fit-content;
        }

        .badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .badge-success {
          background: #d4edda;
          color: #155724;
        }

        .badge-danger {
          background: #f8d7da;
          color: #721c24;
        }

        .badge-info {
          background: #d1ecf1;
          color: #0c5460;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .btn-icon {
          padding: 0.5rem;
          font-size: 1.2rem;
          border: none;
          background: transparent;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .btn-icon:hover {
          background: rgba(0, 0, 0, 0.05);
          transform: scale(1.1);
        }

        .loading-state,
        .empty-state {
          text-align: center;
          padding: 3rem;
          color: #666;
        }

        .empty-state button {
          margin-top: 1rem;
        }

        .pagination-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          border-top: 1px solid #eee;
        }

        .pagination-info {
          color: #666;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};

export default ProductList;