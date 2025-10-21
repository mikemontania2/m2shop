import React, { useEffect, useState } from 'react';
import { getStores, Store } from '../services/storeService';

const StoresPage: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    getStores().then(setStores);
  }, []);

  return (
    <div className="container">
      <h1>Sucursales</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {stores.map((s) => (
          <div key={s.id} style={{ border: '1px solid var(--border-color)', borderRadius: 8, padding: 16 }}>
            <h3>{s.name}</h3>
            <p>{s.address}</p>
            <p>Tel: {s.phone}</p>
            <p>Horario: {s.schedule}</p>
            {s.mapEmbed && (
              <div style={{ marginTop: 12 }}>
                <iframe title={s.name} src={s.mapEmbed} width="100%" height="180" style={{ border: 0 }} loading="lazy"></iframe>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoresPage;
