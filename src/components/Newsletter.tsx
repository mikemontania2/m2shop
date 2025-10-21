import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Ingresá un email válido', 'error');
      return;
    }
    showToast('¡Gracias por suscribirte!', 'success');
    setEmail('');
  };

  return (
    <section className="newsletter-section">
      <div className="container newsletter-container">
        <div className="newsletter-content">
          <div className="newsletter-icon"><Mail size={24} /></div>
          <div>
            <h3 className="newsletter-title">Suscribite al Newsletter</h3>
            <p className="newsletter-subtitle">Enterate primero de novedades y promociones</p>
          </div>
        </div>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email para newsletter"
          />
          <button type="submit" className="btn-primary">Suscribirme</button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
