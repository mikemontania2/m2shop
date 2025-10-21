import React, { useState } from 'react';
import authService from '../services/authService';
import { Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = authService.login(email, password);
    if (result.success && result.user) {
      if (authService.isAdmin()) {
        navigate('/admin');
      } else {
        setError('No tienes permisos de administrador');
        authService.logout();
      }
    } else {
      setError(result.message || 'Error al iniciar sesión');
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
                />
              </div>

              <button type="submit" className="btn-primary btn-block">
                Iniciar Sesión
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
