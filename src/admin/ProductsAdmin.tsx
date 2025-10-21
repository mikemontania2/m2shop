import React, { useMemo, useState } from 'react';
import productService, { Product, Category } from '../services/productService';

const emptyProduct = (nextId: number): Product => ({
  id: nextId,
  name: '',
  category: '',
  subcategory: '',
  price: 0,
  originalPrice: 0,
  image: '',
  images: [],
  description: '',
  descripcion: '',
  propiedades: [],
  usosRecomendados: [],
  sizes: ['S','M','L','XL'],
  colors: ['Negro','Azul'],
  featured: false,
  stock: 0
});

const ProductsAdmin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(productService.getProducts());
  const [categories] = useState<Category[]>(productService.getCategories());
  const [editing, setEditing] = useState<Product | null>(null);

  const nextId = useMemo(() => (products.reduce((m, p) => Math.max(m, p.id), 0) + 1), [products]);

  const startNew = () => setEditing(emptyProduct(nextId));
  const startEdit = (p: Product) => setEditing({ ...p });
  const cancel = () => setEditing(null);

  const save = () => {
    if (!editing) return;
    productService.upsertProduct(editing);
    setProducts(productService.getProducts());
    setEditing(null);
  };

  const remove = (id: number) => {
    if (!confirm('Eliminar producto?')) return;
    productService.deleteProduct(id);
    setProducts(productService.getProducts());
  };

  return (
    <div>
      <h2>Productos</h2>
      <div style={{ marginBottom: 16 }}>
        <button className="btn-primary" onClick={startNew}>Nuevo Producto</button>
      </div>

      {editing && (
        <div className="admin-panel" style={{ marginBottom: 24 }}>
          <div className="form-grid">
            <label>Nombre<input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} /></label>
            <label>Categoría<select value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })}>
              <option value="">Seleccione</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select></label>
            <label>Subcategoría<input value={editing.subcategory || ''} onChange={e => setEditing({ ...editing, subcategory: e.target.value })} /></label>
            <label>Precio<input type="number" value={editing.price} onChange={e => setEditing({ ...editing, price: parseInt(e.target.value)||0 })} /></label>
            <label>Precio Original<input type="number" value={editing.originalPrice} onChange={e => setEditing({ ...editing, originalPrice: parseInt(e.target.value)||0 })} /></label>
            <label>Stock<input type="number" value={editing.stock} onChange={e => setEditing({ ...editing, stock: parseInt(e.target.value)||0 })} /></label>
            <label>Imagen principal<input value={editing.image} onChange={e => setEditing({ ...editing, image: e.target.value })} /></label>
            <label>Imágenes (coma separadas)<input value={editing.images.join(',')} onChange={e => setEditing({ ...editing, images: e.target.value.split(',').map(s=>s.trim()).filter(Boolean) })} /></label>
            <label>Destacado<select value={editing.featured? '1':'0'} onChange={e => setEditing({ ...editing, featured: e.target.value==='1' })}><option value="0">No</option><option value="1">Sí</option></select></label>
            <label>Descripción breve<textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} /></label>
            <label>Descripción (larga)<textarea value={editing.descripcion||''} onChange={e => setEditing({ ...editing, descripcion: e.target.value })} /></label>
            <label>Propiedades (una por línea)<textarea value={(editing.propiedades||[]).join('\n')} onChange={e => setEditing({ ...editing, propiedades: e.target.value.split('\n').map(s=>s.trim()).filter(Boolean) })} /></label>
            <label>Usos Recomendados (una por línea)<textarea value={(editing.usosRecomendados||[]).join('\n')} onChange={e => setEditing({ ...editing, usosRecomendados: e.target.value.split('\n').map(s=>s.trim()).filter(Boolean) })} /></label>
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <button className="btn-primary" onClick={save}>Guardar</button>
            <button className="btn-secondary" onClick={cancel}>Cancelar</button>
          </div>
        </div>
      )}

      <div className="admin-panel">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <button className="btn-secondary" onClick={() => startEdit(p)}>Editar</button>{' '}
                  <button className="btn-secondary" onClick={() => remove(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsAdmin;
