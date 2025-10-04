import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export default function Header() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="header" style={{ background: '#c41e3a' }}>
      <div className="container" style={{ padding: '10px 0' }}>
        <div className="header-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <Link to="/" className="logo" aria-label="Ir al inicio">
            <img
              src="https://www.cavallaro.com.py/img/logo-web-blanco.png"
              alt="Cavallaro"
              height={48}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/fallback-logo.png';
              }}
            />
          </Link>

          <nav className="main-nav" style={{ gap: 16 }}>
            <Link to="/">Inicio</Link>
            <Link to="/productos">Productos</Link>
            <Link to="/nosotros">Nosotros</Link>
            <Link to="/contacto">Contacto</Link>
            <Link to="/ubicaciones">Ubicaciones</Link>
          </nav>

          <div className="header-actions">
            {user ? (
              <>
                <Link to="/mis-pedidos" className="login-link" style={{ color: '#fff' }}>Mis pedidos</Link>
                <button onClick={logout} className="btn btn-secondary">Salir</button>
              </>
            ) : (
              <Link to="/login" className="login-link" style={{ color: '#fff' }}>Iniciar sesión</Link>
            )}
            <Link to="/carrito" className="cart-button" aria-label="Ver carrito" style={{ color: '#fff' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
