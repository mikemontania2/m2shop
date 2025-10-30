
// ========================================
// RegisterPage.tsx - ACTUALIZADO
// ========================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext'; ;
import { User, Mail, Lock, Loader } from 'lucide-react';
import authService from '../services/auth.service';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, showToast } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (name.trim().length < 3) {
      setError('El nombre debe tener al menos 3 caracteres');
      return;
    }

    setLoading(true);

    try {
      const result = await authService.register(email, password, name);
      
     if (result.success) {
  showToast('Registro exitoso. Bienvenido!', 'success');

  // 🔧 Forzar actualización del contexto con el nuevo usuario
  await login(email, password);

  navigate('/');
}else {
        setError(result.message || 'Error al registrarse');
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
            <h1>Crear Cuenta</h1>
            <p className="login-subtitle">Completa el formulario para registrarte</p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  <User size={20} />
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre completo"
                  required
                  disabled={loading}
                  minLength={3}
                />
              </div>

              <div className="form-group">
                <label>
                  <Mail size={20} />
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
                  minLength={6}
                />
              </div>

              <div className="form-group">
                <label>
                  <Lock size={20} />
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>

              <button type="submit" className="btn-primary btn-block" disabled={loading}>
                {loading ? (
                  <>
                    <Loader size={20} className="spinner" />
                    Registrando...
                  </>
                ) : (
                  'Registrarse'
                )}
              </button>
            </form>

            <div className="login-demo">
              <p>¿Ya tienes cuenta? <button onClick={() => navigate('/login')} className="link-button">Inicia sesión aquí</button></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;