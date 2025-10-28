// ========================================
// LoginPage.tsx - ACTUALIZADO
// ========================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { User, Lock, Loader } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        navigate('/');
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
            <h1>Iniciar Sesión</h1>
            <p className="login-subtitle">Ingresa tus credenciales para continuar</p>

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
                  placeholder="tu@email.com"
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
                    Iniciando...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </form>

            <div className="login-demo">
              <p>¿No tienes cuenta? <button onClick={() => navigate('/register')} className="link-button">Regístrate aquí</button></p>
              <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #e0e0e0' }} />
              <p><strong>Cuentas de prueba:</strong></p>
              <p>Email: admin@cavallaro.com | Password: admin123</p>
              <p>Email: usuario@example.com | Password: usuario123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;