import React, { useEffect, useState } from 'react'; 
import { useApp } from '../contexts/AppContext';
import { AtributoAdmin, deleteProducto, getAllAtributos, getAllProductos, getProductoById, ProductoAdmin } from '../services/admin/ProductoServices.admin';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import VariantManager from './VariantManager';
import AttributeManager from './AttributeManager';
 import "../styles/AdminProduct.css"
type ViewMode = 'list' | 'create' | 'edit' | 'variants' | 'attributes';

const ProductsAdminPage: React.FC = () => {
  const { showToast, categories } = useApp();
  
  // Estados principales
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [productos, setProductos] = useState<ProductoAdmin[]>([]);
  const [selectedProducto, setSelectedProducto] = useState<ProductoAdmin | null>(null);
  const [atributos, setAtributos] = useState<AtributoAdmin[]>([]);
  
  // Estados de UI
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9999,
    total: 0,
    totalPages: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategoriaId, setFilterCategoriaId] = useState<number | undefined>();

  // ============================================
  // EFECTOS
  // ============================================

  // Cargar productos al montar o cambiar filtros/paginación
  useEffect(() => {
    loadProductos();
  }, [pagination.page, searchTerm, filterCategoriaId]);

  // Cargar atributos al montar (para formularios)
  useEffect(() => {
    loadAtributos();
  }, []);

  // ============================================
  // FUNCIONES DE CARGA
  // ============================================

  const loadProductos = async () => {
    try {
      setLoading(true);
      const response = await getAllProductos(
        pagination.page,
        pagination.limit,
        searchTerm,
        filterCategoriaId
      );
      
      setProductos(response.productos);
      setPagination(prev => ({
        ...prev,
        total: response.pagination.total,
        totalPages: response.pagination.totalPages
      }));
    } catch (error: any) {
      showToast(error.message || 'Error al cargar productos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadAtributos = async () => {
    try {
      const response = await getAllAtributos();
      setAtributos(response.atributos);
    } catch (error: any) {
      console.error('Error al cargar atributos:', error);
    }
  };

  // ============================================
  // MANEJADORES DE EVENTOS
  // ============================================

  const handleCreateNew = () => {
    setSelectedProducto(null);
    setViewMode('create');
  };

  const handleEdit = async (productoId: number) => {
    try {
      setLoading(true);
      const response = await getProductoById(productoId);
      setSelectedProducto(response.producto);
      setViewMode('edit');
    } catch (error: any) {
      showToast(error.message || 'Error al cargar producto', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleManageVariants = async (productoId: number) => {
    try {
      setLoading(true);
      const response = await getProductoById(productoId);
      setSelectedProducto(response.producto);
      setViewMode('variants');
    } catch (error: any) {
      showToast(error.message || 'Error al cargar producto', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productoId: number) => {
    if (!confirm('¿Estás seguro de eliminar este producto? Se eliminarán también todas sus variantes.')) {
      return;
    }

    try {
      await deleteProducto(productoId);
      showToast('Producto eliminado exitosamente', 'success');
      await loadProductos();
    } catch (error: any) {
      showToast(error.message || 'Error al eliminar producto', 'error');
    }
  };

  const handleSaveProducto = async () => {
    showToast('Producto guardado exitosamente', 'success');
    setViewMode('list');
    await loadProductos();
  };

  const handleCancel = () => {
    setSelectedProducto(null);
    setViewMode('list');
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleFilterCategory = (categoriaId: number | undefined) => {
    setFilterCategoriaId(categoriaId);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handleManageAttributes = () => {
    setViewMode('attributes');
  };

  const handleAttributesUpdated = async () => {
    await loadAtributos();
    showToast('Atributos actualizados', 'success');
  };

  // ============================================
  // RENDERIZADO
  // ============================================

  return (
    <div className="products-admin-page">
      <div className="admin-header">
        <h2>Gestión de Productos</h2>
        
        {viewMode === 'list' && (
          <div className="admin-header-actions">
            <button 
              className="btn-secondary" 
              onClick={handleManageAttributes}
            >
              Gestionar Atributos
            </button>
            <button 
              className="btn-primary" 
              onClick={handleCreateNew}
            >
              Nuevo Producto
            </button>
          </div>
        )}

        {viewMode !== 'list' && (
          <button 
            className="btn-secondary" 
            onClick={handleCancel}
          >
            ← Volver al Listado
          </button>
        )}
      </div>

      {/* Vista de Listado */}
      {viewMode === 'list' && (
        <ProductList
          productos={productos}
          categories={categories}
          loading={loading}
          pagination={pagination}
          searchTerm={searchTerm}
          filterCategoriaId={filterCategoriaId}
          onSearch={handleSearch}
          onFilterCategory={handleFilterCategory}
          onPageChange={handlePageChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onManageVariants={handleManageVariants}
        />
      )}

      {/* Vista de Creación/Edición */}
      {(viewMode === 'create' || viewMode === 'edit') && (
        <ProductForm
          producto={selectedProducto}
          categories={categories}
          isEdit={viewMode === 'edit'}
          onSave={handleSaveProducto}
          onCancel={handleCancel}
        />
      )}

      {/* Vista de Gestión de Variantes */}
      {viewMode === 'variants' && selectedProducto && (
        <VariantManager
          producto={selectedProducto}
          atributos={atributos}
          onBack={handleCancel}
          onVariantsUpdated={loadProductos}
        />
      )}

      {/* Vista de Gestión de Atributos */}
      {viewMode === 'attributes' && (
        <AttributeManager
          atributos={atributos}
          onBack={handleCancel}
          onAttributesUpdated={handleAttributesUpdated}
        />
      )}
    </div>
  );
};

export default ProductsAdminPage;