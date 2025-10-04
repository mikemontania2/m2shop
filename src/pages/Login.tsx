import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Api } from '../lib/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await Api.login({ email, password });
      navigate('/');
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="page-content">
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className="contact-form" style={{ maxWidth: 400 }}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button className="btn btn-primary" type="submit">Entrar</button>
      </form>
    </div>
  );
}
