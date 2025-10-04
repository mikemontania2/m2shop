import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>CAVALLARO</h3>
            <p>Tu tienda de confianza para productos de limpieza e higiene</p>
          </div>

          <div className="footer-section">
            <h4>Navegación</h4>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/productos">Productos</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Categorías</h4>
            <ul>
              <li><Link to="/productos?categoria=higiene-personal">Higiene Personal</Link></li>
              <li><Link to="/productos?categoria=cuidado-prendas">Cuidado de Prendas</Link></li>
              <li><Link to="/productos?categoria=limpieza-hogar">Limpieza del Hogar</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contacto</h4>
            <ul>
              <li>Teléfono: (021) 555-0100</li>
              <li>Email: info@cavallaro.com.py</li>
              <li>Asunción, Paraguay</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Cavallaro. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
