export default function Contact() {
  return (
    <div className="container">
      <div className="page-content">
        <h1>Contacto</h1>

        <div className="contact-content">
          <section className="contact-info">
            <h2>Información de Contacto</h2>

            <div className="contact-item">
              <h3>Teléfono</h3>
              <p>(021) 555-0100</p>
            </div>

            <div className="contact-item">
              <h3>Email</h3>
              <p>info@cavallaro.com.py</p>
            </div>

            <div className="contact-item">
              <h3>Dirección</h3>
              <p>Asunción, Paraguay</p>
            </div>

            <div className="contact-item">
              <h3>Horarios de Atención</h3>
              <p>Lunes a Viernes: 8:00 - 18:00</p>
              <p>Sábados: 8:00 - 13:00</p>
              <p>Domingos: Cerrado</p>
            </div>
          </section>

          <section className="contact-form-section">
            <h2>Envíanos un Mensaje</h2>
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input type="text" id="name" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input type="tel" id="phone" />
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensaje</label>
                <textarea id="message" rows={5} required></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Enviar Mensaje
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
