import React, { useState } from 'react';
 import { Lock, User, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await authService.login(email, password);
      
      if (result.success && result.user) {
        // Verificar si es admin
        if (result.user.rol === 'admin') {
          navigate('/admin');
        } else {
          setError('No tienes permisos de administrador');
          authService.logout();
        }
      } else {
        setError(result.message || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-container">
          <div className="login-box">
            <h1>Panel de Administración</h1>
            <p className="login-subtitle">Acceso solo para administradores</p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  <User size={20} />
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@cavallaro.com"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>
                  <Lock size={20} />
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
              </div>

              <button type="submit" className="btn-primary btn-block" disabled={loading}>
                {loading ? (
                  <>
                    <Loader size={20} className="spinner" />
                    Verificando...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </form>

            <div className="login-demo">
              <p><button onClick={() => navigate('/')} className="link-button">Volver a la tienda</button></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;