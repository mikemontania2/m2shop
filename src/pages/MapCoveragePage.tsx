import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import L from 'leaflet';
import branchesService from '../services/branchesService';
import coverageService from '../services/coverageService';

const MapCoveragePage: React.FC = () => {
  const branches = branchesService.getBranches();
  const areas = coverageService.getCoverage();

  const center = branches.length > 0 ? [branches[0].lat, branches[0].lng] as [number, number] : [-25.2969, -57.6244];
  const bounds = areas.length > 0 ? (areas[0].coordinates as any) : undefined;

  return (
    <div className="container" style={{ padding: '20px 0' }}>
      <h1>Mapa de Cobertura</h1>
      <div style={{ height: 520, width: '100%', borderRadius: 12, overflow: 'hidden', boxShadow: '0 6px 16px rgba(0,0,0,0.1)' }}>
        <MapContainer center={center} zoom={11} style={{ height: '100%', width: '100%' }} bounds={bounds}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
          {areas.map(a => (
            <Polygon key={a.id} positions={a.coordinates as any} pathOptions={{ color: a.color, weight: a.weight, fillOpacity: a.fillOpacity }}>
              <Popup>{a.name}</Popup>
            </Polygon>
          ))}
          {branches.map(b => (
            <Marker key={b.id} position={[b.lat, b.lng]} draggable
              eventHandlers={{
                dragend: (e) => {
                  const m = e.target as L.Marker;
                  const pos = m.getLatLng();
                  const updated = branchesService.getBranches().map(x => x.id===b.id ? { ...x, lat: pos.lat, lng: pos.lng } : x);
                  localStorage.setItem('branches', JSON.stringify(updated));
                }
              }}
            >
              <Popup>
                <strong>{b.name}</strong><br />
                {b.address}<br />
                {b.phone}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapCoveragePage;
