import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="container">
      <h1>Contacto</h1>
      <p>Completa el siguiente formulario y nos pondremos en contacto.</p>
      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" placeholder="Tu nombre" required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="tu@email.com" required />
        </div>
        <div className="form-group">
          <label>Mensaje</label>
          <textarea rows={5} placeholder="Escribe tu mensaje" required />
        </div>
        <button className="btn-primary" type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ContactPage;
