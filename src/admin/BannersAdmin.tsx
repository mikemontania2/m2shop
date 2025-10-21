import React, { useMemo, useState } from 'react';
import bannerService, { Banner } from '../services/BannerService';

const emptyBanner = (id: number): Banner => ({ id, title: '', subtitle: '', image: '', active: true, order: 1 });

const BannersAdmin: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>(bannerService.getAllBanners());
  const [editing, setEditing] = useState<Banner | null>(null);

  const nextId = useMemo(() => (banners.reduce((m, b) => Math.max(m, b.id), 0) + 1), [banners]);

  const startNew = () => setEditing(emptyBanner(nextId));
  const startEdit = (b: Banner) => setEditing({ ...b });
  const cancel = () => setEditing(null);

  const save = () => {
    if (!editing) return;
    bannerService.upsertBanner(editing);
    setBanners(bannerService.getAllBanners());
    setEditing(null);
  };

  const remove = (id: number) => {
    if (!confirm('Eliminar banner?')) return;
    bannerService.deleteBanner(id);
    setBanners(bannerService.getAllBanners());
  };

  return (
    <div>
      <h2>Banners</h2>
      <div style={{ marginBottom: 16 }}>
        <button className="btn-primary" onClick={startNew}>Nuevo Banner</button>
      </div>

      {editing && (
        <div className="admin-panel" style={{ marginBottom: 24 }}>
          <div className="form-grid">
            <label>Título<input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} /></label>
            <label>Subtítulo<input value={editing.subtitle} onChange={e => setEditing({ ...editing, subtitle: e.target.value })} /></label>
            <label>Imagen<input value={editing.image} onChange={e => setEditing({ ...editing, image: e.target.value })} /></label>
            <label>Orden<input type="number" value={editing.order} onChange={e => setEditing({ ...editing, order: parseInt(e.target.value)||1 })} /></label>
            <label>Activo<select value={editing.active? '1':'0'} onChange={e => setEditing({ ...editing, active: e.target.value==='1' })}><option value="1">Sí</option><option value="0">No</option></select></label>
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
              <th>ID</th><th>Título</th><th>Activo</th><th>Orden</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {banners.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.title}</td>
                <td>{b.active? 'Sí':'No'}</td>
                <td>{b.order}</td>
                <td>
                  <button className="btn-secondary" onClick={() => startEdit(b)}>Editar</button>{' '}
                  <button className="btn-secondary" onClick={() => remove(b.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BannersAdmin;
