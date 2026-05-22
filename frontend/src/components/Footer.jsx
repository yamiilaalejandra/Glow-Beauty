import React from "react";
import logo from '../assets/logo.jpeg';
import facebookIcon from '../assets/facebook.svg';
import instagramIcon from '../assets/instagram.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <a href="/" className="footer-logo" aria-label="Glow Beauty">
            <img src={logo} alt="Glow Beauty" className="footer-logo-image" />
          </a>
          <p className="footer-tagline">
            Cuidado, estética y bienestar elegidos con amor para resaltar tu brillo natural.
          </p>
        </div>

        <div className="footer-column">
          <h3>Contenidos</h3>
          <ul className="footer-list">
            <li><a href="/">Inicio</a></li>
            <li><a href="/products">Productos</a></li>
            <li><a href="/accessories">Accesorios</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Ayuda</h3>
          <ul className="footer-list">
            <li><a href="#">Preguntas frecuentes</a></li>
            <li><a href="#">Trabaja con nosotros</a></li>
            <li><a href="#">Políticas de privacidad</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>

        <div className="footer-column footer-newsletter">
          <h3>Suscribite para novedades</h3>
          <form className="footer-form" onSubmit={(event) => event.preventDefault()}>
            <input
              type="text"
              className="footer-input"
              placeholder="Tu nombre"
              aria-label="Tu nombre"
            />
            <input
              type="email"
              className="footer-input"
              placeholder="Tu correo electrónico"
              aria-label="Tu correo electrónico"
            />
            <button type="submit" className="btn btn-newsletter">
              Suscribirme
            </button>
          </form>

          <div className="footer-social">
            <p>Conéctate con nosotros</p>
            <div className="footer-social-icons">
              <a href="#" className="footer-social-icon" aria-label="Facebook">
                <img src={facebookIcon} alt="Facebook" />
              </a>
              <a href="#" className="footer-social-icon" aria-label="Instagram">
                <img src={instagramIcon} alt="Instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-divider" />
      <p className="footer-copy">(c) 2026 Glow Beauty - Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;
