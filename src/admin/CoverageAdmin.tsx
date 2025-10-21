import React, { useMemo, useState, useRef, useEffect } from 'react';
import coverageService, { CoverageArea } from '../services/coverageService';
import { MapContainer, TileLayer, Polygon, Marker } from 'react-leaflet';
import L from 'leaflet';

const emptyArea = (id: string): CoverageArea => ({ id, name: '', color: '#2f86eb', weight: 2, fillOpacity: 0.2, coordinates: [] });

const CoverageAdmin: React.FC = () => {
  const [areas, setAreas] = useState<CoverageArea[]>(coverageService.getCoverage());
  const [editing, setEditing] = useState<CoverageArea | null>(null);
  const nextId = useMemo(() => 'area-' + Date.now(), []);

  const startNew = () => setEditing(emptyArea(nextId));
  const startEdit = (a: CoverageArea) => setEditing(JSON.parse(JSON.stringify(a)) as CoverageArea);
  const cancel = () => setEditing(null);

  const save = () => {
    if (!editing) return;
    coverageService.upsertArea(editing);
    setAreas(coverageService.getCoverage());
    setEditing(null);
  };

  const remove = (id: string) => {
    if (!confirm('Eliminar área?')) return;
    coverageService.deleteArea(id);
    setAreas(coverageService.getCoverage());
  };

  const addCoord = () => {
    if (!editing) return;
    setEditing({ ...editing, coordinates: [...editing.coordinates, [-25.3, -57.6]] });
  };

  const updateCoord = (index: number, key: 'lat'|'lng', value: number) => {
    if (!editing) return;
    const coords = editing.coordinates.map((c, i) => i === index ? (key==='lat' ? [value, c[1]] : [c[0], value]) as [number, number] : c);
    setEditing({ ...editing, coordinates: coords });
  };

  const removeCoord = (index: number) => {
    if (!editing) return;
    setEditing({ ...editing, coordinates: editing.coordinates.filter((_, i) => i !== index) });
  };

  const mapRef = useRef<any>(null);
  const [addingEnabled, setAddingEnabled] = useState(true);

  const mapClickToAdd = (e: any) => {
    if (!editing || !addingEnabled) return;
    const { lat, lng } = e.latlng;
    setEditing({ ...editing, coordinates: [...editing.coordinates, [lat, lng]] });
  };

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    map.off('click');
    if (addingEnabled) {
      map.on('click', mapClickToAdd);
    }
    return () => {
      map.off('click', mapClickToAdd);
    };
  }, [addingEnabled, editing]);

  return (
    <div>
      <h2>Áreas de Cobertura</h2>
      <div style={{ marginBottom: 16 }}>
        <button className="btn-primary" onClick={startNew}>Nueva Área</button>
      </div>

      {editing && (
        <div className="admin-panel" style={{ marginBottom: 24 }}>
          <div className="form-grid">
            <label>ID<input value={editing.id} onChange={e => setEditing({ ...editing, id: e.target.value })} /></label>
            <label>Nombre<input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} /></label>
            <label>Color<input value={editing.color} onChange={e => setEditing({ ...editing, color: e.target.value })} /></label>
            <label>Grosor<input type="number" value={editing.weight} onChange={e => setEditing({ ...editing, weight: parseInt(e.target.value)||1 })} /></label>
            <label>Opacidad<input type="number" step="0.05" value={editing.fillOpacity} onChange={e => setEditing({ ...editing, fillOpacity: parseFloat(e.target.value)||0 })} /></label>
          </div>
          <div style={{ marginTop: 12 }}>
            <h3>Dibuja o edita el polígono en el mapa</h3>
            <div style={{ height: 380, borderRadius: 8, overflow: 'hidden' }}>
              <MapContainer center={editing.coordinates[0] ? [editing.coordinates[0][0], editing.coordinates[0][1]] : [-25.2969,-57.6244]} zoom={12} style={{height:'100%', width:'100%'}}
                whenCreated={(map) => { mapRef.current = map; }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {editing.coordinates.length > 2 && (
                  <Polygon positions={editing.coordinates as any} pathOptions={{ color: editing.color, weight: editing.weight, fillOpacity: editing.fillOpacity }} />
                )}
                {editing.coordinates.map((c, idx) => (
                  <Marker key={idx} position={[c[0], c[1]]} draggable eventHandlers={{
                    dragend: (e) => {
                      const m = e.target as L.Marker; const pos = m.getLatLng();
                      const next = [...editing.coordinates];
                      next[idx] = [pos.lat, pos.lng];
                      setEditing({ ...editing, coordinates: next });
                    }
                  }} />
                ))}
              </MapContainer>
            </div>
            <div style={{ display:'flex', gap:8, marginTop: 8 }}>
              <button className="btn-secondary" onClick={()=> setEditing({ ...editing, coordinates: editing.coordinates.slice(0, -1) })} disabled={editing.coordinates.length===0}>Deshacer</button>
              <button className="btn-secondary" onClick={()=> setEditing({ ...editing, coordinates: [] })} disabled={editing.coordinates.length===0}>Limpiar</button>
              <button className="btn-secondary" onClick={()=>{
                if (editing.coordinates.length < 3) { alert('El polígono debe tener al menos 3 puntos para cerrarse'); return; }
                setAddingEnabled(false);
              }}>Cerrar polígono</button>
            </div>
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
              <th>ID</th><th>Nombre</th><th>Puntos</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {areas.map(a => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.coordinates.length}</td>
                <td>
                  <button className="btn-secondary" onClick={() => startEdit(a)}>Editar</button>{' '}
                  <button className="btn-secondary" onClick={() => remove(a.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoverageAdmin;
