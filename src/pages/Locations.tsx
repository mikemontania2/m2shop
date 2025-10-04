export default function Locations() {
  const locations = [
    {
      name: 'Sucursal Centro',
      address: 'Av. Mariscal López y Brasilia, Asunción',
      phone: '(021) 555-0101',
      hours: 'Lun-Vie: 8:00-18:00, Sáb: 8:00-13:00',
    },
    {
      name: 'Sucursal Villa Morra',
      address: 'Av. San Martín 1234, Asunción',
      phone: '(021) 555-0102',
      hours: 'Lun-Vie: 8:00-18:00, Sáb: 8:00-13:00',
    },
    {
      name: 'Sucursal Fernando de la Mora',
      address: 'Ruta 2 Km 13, Fernando de la Mora',
      phone: '(021) 555-0103',
      hours: 'Lun-Vie: 8:00-18:00, Sáb: 8:00-13:00',
    },
  ];

  return (
    <div className="container">
      <div className="page-content">
        <h1>Nuestras Ubicaciones</h1>

        <div className="locations-grid">
          {locations.map((location, index) => (
            <div key={index} className="location-card">
              <h2>{location.name}</h2>
              <div className="location-info">
                <div className="location-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>{location.address}</span>
                </div>
                <div className="location-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>{location.phone}</span>
                </div>
                <div className="location-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span>{location.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
