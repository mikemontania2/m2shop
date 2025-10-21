import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>CAVALLARO</h3>
            <p>Elegancia y estilo masculino desde 1995. Ofrecemos las mejores marcas y la más alta calidad en indumentaria para hombres.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Categorías</h4>
            <ul>
              <li><a href="#">Camisas</a></li>
              <li><a href="#">Pantalones</a></li>
              <li><a href="#">Sacos</a></li>
              <li><a href="#">Calzados</a></li>
              <li><a href="#">Accesorios</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Atención al Cliente</h4>
            <ul>
              <li><a href="#">Preguntas Frecuentes</a></li>
              <li><a href="#">Métodos de Pago</a></li>
              <li><a href="#">Envíos</a></li>
              <li><a href="#">Cambios y Devoluciones</a></li>
              <li><a href="#">Términos y Condiciones</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contacto</h4>
            <ul className="contact-list">
              <li>
                <MapPin size={16} />
                <span>Av. Mariscal López 1234, Asunción</span>
              </li>
              <li>
                <Phone size={16} />
                <span>(021) 123-4567</span>
              </li>
              <li>
                <Mail size={16} />
                <span>info@cavallaro.com.py</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Cavallaro. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
